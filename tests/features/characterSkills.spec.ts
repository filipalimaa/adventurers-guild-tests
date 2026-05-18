import { expect, test } from '@playwright/test';
import { getToken } from "../client/authClient.js";
import { createCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSkillsProficiencies, patchCharacterSpecie } from '../client/characterClient.js';
import { CHARACTER_ABILITYSCORES, CHARACTER_BACKGROUNDId, CHARACTER_CLASSId, CHARACTER_NAME, CHARACTER_SKILLS, CHARACTER_SPECIESId } from '../data/characterData.js';
import { getSkillsProficiencies } from '../client/characterSkills.js';
import { expectStatusCode } from '../snippets/responseHelpers.js';
import { characterAbilityScoresPut } from '../client/characterAbilityScores.js';

let token = '';
let characterId = 0;

test.describe.serial('Character Skills Flow', { tag: ['@flow', '@skills'] }, () => {

    test.beforeAll(async ({ request }) => {
            token = await getToken(request);
            const { createCharacterBody } = await createCharacter(request, token, CHARACTER_NAME);
            characterId = createCharacterBody.id;

            await patchCharacterClass(request, token, characterId, CHARACTER_CLASSId);
            await patchCharacterSpecie(request, token, characterId, CHARACTER_SPECIESId);
            await patchCharacterBackground(request, token, characterId, CHARACTER_BACKGROUNDId);
            await characterAbilityScoresPut(request, token, characterId, CHARACTER_ABILITYSCORES);

        });

    test('Get Skills Proficiencies Options', { tag: ['@get', '@data'] }, async ({ request }) => {

        const { response, skillsProficienciesResponse } = await getSkillsProficiencies(
            request,
            token,
            characterId,
        );

        expectStatusCode(response, 200);
        expect(Array.isArray(skillsProficienciesResponse)).toBe(true);
        
        const arcana = skillsProficienciesResponse.find((s: any) => s.name === 'Arcana');
        expect(arcana).toBeDefined();
        expect(arcana.isProficient).toBe(true);
        expect(arcana.abilityModifier).toBe(3);

        const history = skillsProficienciesResponse.find((s: any) => s.name === 'History');
        expect(history).toBeDefined();
        expect(history.isProficient).toBe(true);
        
    });

    test('Patch Other Skills Profiencies', { tag: ['@patch', '@data'] }, async ({ request }) => {

        const { response, patchCharacterSkillsResponse } = await patchCharacterSkillsProficiencies(
            request,
            token,
            characterId,
            CHARACTER_SKILLS,
        );

        expectStatusCode(response, 200);
        expect(patchCharacterSkillsResponse.skillProficiencies).toContain('Investigation');
        expect(patchCharacterSkillsResponse.skillProficiencies).toContain('Insight');
        expect(patchCharacterSkillsResponse.skillProficiencies).toContain('Arcana');
        
    });

    test('Validate Filara Skills Calculation After Patch', { tag: ['@get', '@smoke', '@data'] }, async ({ request }) => {
        const { response, skillsProficienciesResponse } = await getSkillsProficiencies(
            request, token, characterId,
        );

        expectStatusCode(response, 200);

        const arcana = skillsProficienciesResponse.find((s: any) => s.name === 'Arcana');
        expect(arcana.isProficient).toBe(true);
        expect(arcana.total).toBe(5);

        const investigation = skillsProficienciesResponse.find((s: any) => s.name === 'Investigation');
        expect(investigation.isProficient).toBe(true);
        expect(investigation.total).toBe(5);

        const stealth = skillsProficienciesResponse.find((s: any) => s.name === 'Stealth');
        expect(stealth.isProficient).toBe(false);
        expect(stealth.total).toBe(2);
    });

    test('Reject invalid skill count', async ({ request }) => {
        const { response } = await patchCharacterSkillsProficiencies(
            request, token, characterId,
            { skillProficiencies: ['Investigation', 'Insight', 'Religion'] }
        );
        expectStatusCode(response, 400);
    });

})

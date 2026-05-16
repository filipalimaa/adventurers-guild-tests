import { expect, test } from '@playwright/test';
import { getToken } from '../client/authClient.js';
import { createCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSpecie } from '../client/characterClient.js';
import { CHARACTER_ABILITYSCORES, CHARACTER_BACKGROUNDId, CHARACTER_CLASSId, CHARACTER_NAME, CHARACTER_SPECIESId } from '../data/characterData.js';
import { characterAbilityScoresPut, getAbilityScores } from '../client/characterAbilityScores.js';
import { expectStatusCode } from '../snippets/responseHelpers.js';

let token = '';
let characterId = 0;

test.describe.serial('Character Stats Flow', () => {

    test.beforeAll(async ({ request }) => {
            token = await getToken(request);
            const { createCharacterBody } = await createCharacter(request, token, CHARACTER_NAME);
            characterId = createCharacterBody.id;

            await patchCharacterClass(request, token, characterId, CHARACTER_CLASSId);
            await patchCharacterSpecie(request, token, characterId, CHARACTER_SPECIESId);
            await patchCharacterBackground(request, token, characterId, CHARACTER_BACKGROUNDId);
        });

    test('Get Ability Scores Options', async ({ request }) => {

        const { response, abilityScoresResponse } = await getAbilityScores(
            request,
            token,
            characterId,
        );

        expectStatusCode(response, 200);
        expect(abilityScoresResponse.characterId).toBe(characterId);
        expect(abilityScoresResponse.backgroundName).toBe('Sage');
        expect(abilityScoresResponse.availableChoices).toEqual(['CON', 'INT', 'WIS']);
        expect(abilityScoresResponse.selectedAbilityScores).toBeNull();
    });

    test('Put my Character Ability Scores', async ({ request }) => {

        const { response, characterAbilityScoresResponse } = await characterAbilityScoresPut(
            request,
            token,
            characterId,
            CHARACTER_ABILITYSCORES,
        );

        expectStatusCode(response, 200);

        await test.step('Validate Filara Base Ability Scores', async () => {
            expect(characterAbilityScoresResponse.abilityScores).not.toBeNull();
            expect(characterAbilityScoresResponse.selectedAbilityScores.base.INT).toBe(15);
            expect(characterAbilityScoresResponse.selectedAbilityScores.base.DEX).toBe(14);
            expect(characterAbilityScoresResponse.selectedAbilityScores.bonuses.INT).toBe(2);
            expect(characterAbilityScoresResponse.selectedAbilityScores.bonuses.WIS).toBe(1);
            expect(characterAbilityScoresResponse.hitPoints).not.toBeNull();
            expect(characterAbilityScoresResponse.initiative).not.toBeNull();
  
        });

        await test.step('Validate Filara Final Ability Scores after Bonuses', async () => {
            expect(characterAbilityScoresResponse.selectedAbilityScores.final.INT).toBe(17);
            expect(characterAbilityScoresResponse.selectedAbilityScores.final.WIS).toBe(13);
        
        });
        
    });

    test('Reject Invalid Ability Scores - Base Above Maximum', async ({ request }) => {
        const { response } = await characterAbilityScoresPut(
            request, token, characterId,
            {
                abilityScores: {
                    base: { STR: 16, DEX: 14, CON: 13, INT: 15, WIS: 12, CHA: 10 },
                    bonuses: { STR: 0, DEX: 0, CON: 1, INT: 1, WIS: 1, CHA: 0 }
                }
            }
        );
        expectStatusCode(response, 400);
    });
})

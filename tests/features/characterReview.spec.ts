import { expect, test } from '@playwright/test';
import { getToken } from '../client/authClient.js';
import { createCharacter, getMyFinalCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSkillsProficiencies, patchCharacterSpecie } from '../client/characterClient.js';
import { CHARACTER_ABILITYSCORES, CHARACTER_BACKGROUNDEQUIPMENT, CHARACTER_BACKGROUNDId, CHARACTER_CLASSEQUIPMENT, CHARACTER_CLASSId, CHARACTER_EQUIPMENT, CHARACTER_NAME, CHARACTER_SKILLS, CHARACTER_SPECIESId } from '../data/characterData.js';
import { characterAbilityScoresPut, getAbilityScores } from '../client/characterAbilityScores.js';
import { expectStatusCode } from '../snippets/responseHelpers.js';
import { characterEquipment, equipmentBackgroundChoice, equipmentClassChoice } from '../client/characterEquipment.js';
import { getSpellsOptions, getSpellsSelection, putCharacterSpells } from '../client/characterSpells.js';

let token = '';
let characterId = 0;
let selectedSpellIds: number[] = [];

test.describe.serial('Character Review Flow', { tag: ['@flow', '@review', '@smoke'] }, () => {

    test.beforeAll(async ({ request }) => {
            token = await getToken(request);
            const { createCharacterBody } = await createCharacter(request, token, CHARACTER_NAME);
            characterId = createCharacterBody.id;

            await patchCharacterClass(request, token, characterId, CHARACTER_CLASSId);
            await patchCharacterSpecie(request, token, characterId, CHARACTER_SPECIESId);
            await patchCharacterBackground(request, token, characterId, CHARACTER_BACKGROUNDId);
            await characterAbilityScoresPut(request, token, characterId, CHARACTER_ABILITYSCORES);
            await patchCharacterSkillsProficiencies(request, token, characterId, CHARACTER_SKILLS);
            await equipmentClassChoice(request, token, characterId, CHARACTER_CLASSEQUIPMENT);
            await equipmentBackgroundChoice(request, token, characterId, CHARACTER_BACKGROUNDEQUIPMENT);
            await characterEquipment(request, token, characterId, CHARACTER_EQUIPMENT);
            await getSpellsOptions(request, token, characterId);
            const { spellsSelectionResponse } = await getSpellsSelection(request, token, characterId);

            const selectedCantripIds = spellsSelectionResponse.availableSpells
            .filter((spell: any) => spell.level === 0)
            .slice(0, spellsSelectionResponse.selectionRules.maxCantrips)
            .map((spell: any) => spell.id);
        
            const selectedLeveledSpellIds = spellsSelectionResponse.availableSpells
            .filter((spell: any) => spell.level > 0)
            .slice(0, spellsSelectionResponse.selectionRules.maxSpells)
            .map((spell: any) => spell.id);
        
            selectedSpellIds = [...selectedCantripIds, ...selectedLeveledSpellIds];

            await putCharacterSpells(request, token, characterId, {spellIds: selectedSpellIds});
        });

    test('Review Final My Final Character', { tag: ['@get', '@smoke', '@data'] }, async ({ request }) => {

        const { response, characterBody } = await getMyFinalCharacter(
            request,
            token,
            characterId,
        );

        expectStatusCode(response, 200);
        expect(characterBody.status).toBe('complete');
        expect(characterBody.name).toBe(CHARACTER_NAME.name);
        expect(characterBody.classId).toBe(CHARACTER_CLASSId.classId);
        expect(characterBody.speciesId).toBe(CHARACTER_SPECIESId.speciesId);
        expect(characterBody.backgroundId).toBe(CHARACTER_BACKGROUNDId.backgroundId);
        expect(characterBody.missingFields).toHaveLength(0);
        expect(characterBody.pendingChoices).toHaveLength(0);
        expect(characterBody.level).toBe(1);
        expect(characterBody.abilityScores).not.toBeNull();
        expect(characterBody.abilityScores.final.INT).toBe(17);
        expect(characterBody.abilityScores.final.WIS).toBe(13);
        expect(characterBody.hitPoints).not.toBeNull();
        expect(characterBody.spellcastingSummary.canCastSpells).toBe(true);
        expect(characterBody.spellcastingSummary.ability).toBe('INT');
        expect(characterBody.spellcastingSummary.selectedSpellsCount).toBe(6);
        expect(characterBody.spellcastingSummary.selectedCantripsCount).toBe(3);
        expect(characterBody.selectedSpells).toHaveLength(9);
        expect(characterBody.skillProficiencies).toContain('Arcana');
        expect(characterBody.skillProficiencies).toContain('History');
        expect(characterBody.skillProficiencies).toContain('Investigation');
        expect(characterBody.skillProficiencies).toContain('Insight');
        expect(characterBody.currency).not.toBeNull();
        
    });

})
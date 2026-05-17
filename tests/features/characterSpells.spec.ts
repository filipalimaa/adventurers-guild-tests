import { test, expect} from "@playwright/test";
import { getToken } from "../client/authClient.js";
import { createCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSpecie } from "../client/characterClient.js";
import { CHARACTER_BACKGROUNDId, CHARACTER_CLASSId, CHARACTER_NAME, CHARACTER_SPECIESId } from "../data/characterData.js";
import { getSpellsOptions, getSpellsSelection, putCharacterSpells } from "../client/characterSpells.js";
import { expectStatusCode } from "../snippets/responseHelpers.js";

let token = '';
let characterId = 0;
let selectedSpellIds: number[] = [];

test.describe.serial('Character Spells Flow', () => {

    test.beforeAll(async ({ request }) => {
            token = await getToken(request);
            const { createCharacterBody } = await createCharacter(request, token, CHARACTER_NAME);
            characterId = createCharacterBody.id;

            await patchCharacterClass(request, token, characterId, CHARACTER_CLASSId);
            await patchCharacterSpecie(request, token, characterId, CHARACTER_SPECIESId);
            await patchCharacterBackground(request, token, characterId, CHARACTER_BACKGROUNDId);
        });

    test('Get Spells Options', async ({ request }) => {

        const { response, spellsOptionsResponse } = await getSpellsOptions(
            request,
            token,
            characterId,
        );

        expectStatusCode(response, 200);
        expect(spellsOptionsResponse.className).toBe('Wizard');
        expect(spellsOptionsResponse.spells.length).toBeGreaterThan(0);
        
    });

    test('Get Spells Selection', async ({ request }) => {

        const { response, spellsSelectionResponse } = await getSpellsSelection(
            request,
            token,
            characterId,
        );

        const selectedCantripIds = spellsSelectionResponse.availableSpells
            .filter((spell: any) => spell.level === 0)
            .slice(0, spellsSelectionResponse.selectionRules.maxCantrips)
            .map((spell: any) => spell.id);
        
        const selectedLeveledSpellIds = spellsSelectionResponse.availableSpells
            .filter((spell: any) => spell.level > 0)
            .slice(0, spellsSelectionResponse.selectionRules.maxSpells)
            .map((spell: any) => spell.id);
        
        selectedSpellIds = [...selectedCantripIds, ...selectedLeveledSpellIds];

        expectStatusCode(response, 200);
        expect(spellsSelectionResponse.selectionRules.canSelectSpells).toBe(true);
        expect(spellsSelectionResponse.selectionRules.maxCantrips).toBe(3);
        expect(spellsSelectionResponse.selectionRules.maxSpells).toBe(6);
        expect(selectedSpellIds).toHaveLength(9);
        
    });

    test('Update Character Spells', async ({ request }) => {

        const { response, characterSpellsResponse } = await putCharacterSpells(
            request,
            token,
            characterId,
            { spellIds: selectedSpellIds},
        );

        expectStatusCode(response, 200);
        expect(characterSpellsResponse.selectedSpells).toHaveLength(9);
        
    });

    test('Reject Invalid Spell Selection - Non Existent Spell Id', async ({ request }) => {
        const { response } = await putCharacterSpells(
            request, token, characterId,
            { spellIds: [999999] }
        );
        expectStatusCode(response, 400);
    });

});

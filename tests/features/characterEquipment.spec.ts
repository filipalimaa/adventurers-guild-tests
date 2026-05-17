import { test, expect} from "@playwright/test";
import { getToken } from "../client/authClient.js";
import { createCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSpecie } from "../client/characterClient.js";
import { CHARACTER_BACKGROUNDEQUIPMENT, CHARACTER_BACKGROUNDId, CHARACTER_CLASSEQUIPMENT, CHARACTER_CLASSId, CHARACTER_EQUIPMENT, CHARACTER_NAME, CHARACTER_SPECIESId } from "../data/characterData.js";
import { expectStatusCode } from "../snippets/responseHelpers.js";
import { characterEquipment, equipmentBackgroundChoice, equipmentClassChoice } from "../client/characterEquipment.js";

let token = '';
let characterId = 0;

test.describe.serial('Character Equipment Flow', { tag: ['@flow', '@equipment'] }, () => {

    test.beforeAll(async ({ request }) => {
            token = await getToken(request);
            const { createCharacterBody } = await createCharacter(request, token, CHARACTER_NAME);
            characterId = createCharacterBody.id;

            await patchCharacterClass(request, token, characterId, CHARACTER_CLASSId);
            await patchCharacterSpecie(request, token, characterId, CHARACTER_SPECIESId);
            await patchCharacterBackground(request, token, characterId, CHARACTER_BACKGROUNDId);
        });

    test('Add Character Class Equipment Choice', { tag: ['@post', '@data'] }, async ({ request }) => {

        const { response, equipmentClassChoiceResponse } = await equipmentClassChoice(
            request,
            token,
            characterId,
            CHARACTER_CLASSEQUIPMENT,
        );

        expectStatusCode(response, 200);
        expect(equipmentClassChoiceResponse.characterId).toBe(characterId);
        expect(equipmentClassChoiceResponse.appliedChoice.source).toBe('class');
        expect(equipmentClassChoiceResponse.appliedChoice.label).toBe('A');
        expect(equipmentClassChoiceResponse.addedEquipment.length).toBeGreaterThan(0);
        expect(equipmentClassChoiceResponse.pendingChoices).toContain('backgroundEquipmentSelection');
    
    });

    test('Add Character Background Equipment Choice', { tag: ['@post', '@data'] }, async ({ request }) => {

        const { response, equipmentBackgroundChoiceResponse } = await equipmentBackgroundChoice(
            request,
            token,
            characterId,
            CHARACTER_BACKGROUNDEQUIPMENT,
        );

        expectStatusCode(response, 200);
        expect(equipmentBackgroundChoiceResponse.characterId).toBe(characterId);
        expect(equipmentBackgroundChoiceResponse.appliedChoice.source).toBe('background');
        expect(equipmentBackgroundChoiceResponse.addedEquipment.length).toBeGreaterThan(0);
        expect(equipmentBackgroundChoiceResponse.pendingChoices).toHaveLength(0);
        expect(equipmentBackgroundChoiceResponse.addedEquipment.some((item: any) => item.name === 'Robe')).toBe(true);
        
    });

    test('Add Character Equipment Other Choices', { tag: ['@post', '@data'] }, async ({ request }) => {

        const { response, characterEquipmentResponse } = await characterEquipment(
            request,
            token,
            characterId,
            CHARACTER_EQUIPMENT,
        );

        expectStatusCode(response, 201);
        expect(characterEquipmentResponse.characterId).toBe(characterId);
        expect(characterEquipmentResponse.equipment.some((item: any) => item.name === 'Locking Spellbook')).toBe(true);
        
    });

    test('Reject Invalid Equipment - Non Existent Equipment Id', { tag: ['@post', '@negative', '@error'] }, async ({ request }) => {
        
        const { response } = await characterEquipment(
            request, token, characterId,
            {
                equipmentId: 999999,
                quantity: 1,
                isEquipped: false,
            }
        );
        expectStatusCode(response, 404);
    });

});

import { expect, test } from '@playwright/test';
import { getToken } from '../client/authClient.js';
import { createCharacter, patchCharacterBackground, patchCharacterClass, patchCharacterSpecie } from '../client/characterClient.js';
import { CHARACTER_BACKGROUNDId, CHARACTER_CLASSId, CHARACTER_NAME, CHARACTER_SPECIESId } from '../data/characterData.js';
import { expectFieldsAreNull, expectStatusCode, expectValidId } from '../snippets/responseHelpers.js';

let token = '';
let characterId = 0;

test.describe.serial('Character Creation Flow', { tag: ['@flow', '@creation'] }, () => {

    test.beforeAll(async ({ request }) => {
        token = await getToken(request);
    });

    test('Create My Character', { tag: ['@post', '@smoke', '@data'] }, async ({ request }) => {

        const { response, createCharacterBody } = await createCharacter(
            request,
            token,
            CHARACTER_NAME,
        );

        characterId = createCharacterBody.id;

        expectStatusCode(response, 201);
        expectValidId(characterId);
        expect(createCharacterBody.missingFields).toContain('classId');
        expect(createCharacterBody.missingFields).toContain('speciesId');
        expect(createCharacterBody.missingFields).toContain('backgroundId');
        expectFieldsAreNull(createCharacterBody, ['classId', 'speciesId', 'backgroundId']);
        expect(createCharacterBody.name).toBe(CHARACTER_NAME.name);
        expect(createCharacterBody.status).toBe('draft');
        expect(createCharacterBody.level).toBe(1);
        
    });

    test('Validate my Character Class', { tag: ['@patch', '@data'] }, async ({ request }) => {

        const { response, patchCharacterClassBody } = await patchCharacterClass(
            request,
            token,
            characterId,
            CHARACTER_CLASSId,
        );

        expectStatusCode(response, 200);
        expectValidId(characterId);
        expect(patchCharacterClassBody.classId).toBe(CHARACTER_CLASSId.classId);
        expect(patchCharacterClassBody.missingFields).not.toContain('classId');
        expect(patchCharacterClassBody.pendingChoices).toContain('classEquipmentSelection');
    });

    test('Validate my Character Specie', { tag: ['@patch', '@data'] }, async ({ request }) => {

        const { response, patchCharacterSpecieBody } = await patchCharacterSpecie(
            request,
            token,
            characterId,
            CHARACTER_SPECIESId,
        );

        expectStatusCode(response, 200);
        expectValidId(characterId);
        expect(patchCharacterSpecieBody.speciesId).toBe(CHARACTER_SPECIESId.speciesId);
        expect(patchCharacterSpecieBody.missingFields).not.toContain('speciesId');

    });

    test('Validate my Character Background', { tag: ['@patch', '@data'] }, async ({ request }) => {

        const { response, patchCharacterBackgroundBody } = await patchCharacterBackground(
            request,
            token,
            characterId,
            CHARACTER_BACKGROUNDId,
        );

        expectStatusCode(response, 200);
        expectValidId(characterId);
        expect(patchCharacterBackgroundBody.backgroundId).toBe(CHARACTER_BACKGROUNDId.backgroundId);
        expect(patchCharacterBackgroundBody.missingFields).toHaveLength(0);
        expect(patchCharacterBackgroundBody.missingFields).not.toContain('backgroundId');
        expect(patchCharacterBackgroundBody.status).not.toBe('draft');
    });

})
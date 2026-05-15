import type { APIRequestContext } from "@playwright/test";
import type { CharacterRequestBackgroundPatch, CharacterRequestClassPatch, CharacterRequestPost, CharacterRequestSpeciesPatch } from "../types/characterRequest.js";

export async function createCharacter( 
    request : APIRequestContext,
    token: string,
    data: CharacterRequestPost,
) {

    const createResponse = await request.post('/api/characters', {
        headers: { Authorization: 'Bearer ' + token },
        data
    });

    const createCharacterResponse = await createResponse.json();

    return createCharacterResponse.id
    
};

export async function patchCharacterClass( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestClassPatch
) {

    const patchCharacterClass = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    return patchCharacterClass.json();
    
};

export async function patchCharacterSpecie( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestSpeciesPatch, 
) {

    const patchCharacterSpecie = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    return patchCharacterSpecie.json();
    
};

export async function patchCharacterBackground( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestBackgroundPatch,
) {

    const patchCharacterBackground = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    return patchCharacterBackground.json();
    
}
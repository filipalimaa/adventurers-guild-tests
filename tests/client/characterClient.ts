import type { APIRequestContext } from "@playwright/test";
import type { CharacterRequestBackgroundPatch, CharacterRequestClassPatch, CharacterRequestPost, CharacterRequestSpeciesPatch } from "../types/characterRequest.js";

export async function createCharacter( 
    request : APIRequestContext,
    token: string,
    data: CharacterRequestPost,
) {

    const response = await request.post('/api/characters', {
        headers: { Authorization: 'Bearer ' + token },
        data
    });

    const createCharacterBody = await response.json();

    return { response, createCharacterBody };
    
};

export async function patchCharacterClass( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestClassPatch
) {

    const response = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const patchCharacterClassBody = await response.json();

    return { response, patchCharacterClassBody }; 
    
};

export async function patchCharacterSpecie( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestSpeciesPatch, 
) {

    const response = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const patchCharacterSpecieBody = await response.json();

    return { response, patchCharacterSpecieBody };
    
};

export async function patchCharacterBackground( 
    request : APIRequestContext,
    token: string,
    charId: number,
    data: CharacterRequestBackgroundPatch,
) {

    const response = await request.patch('/api/characters/' + charId, {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const patchCharacterBackgroundBody = await response.json();

    return { response, patchCharacterBackgroundBody };
    
}
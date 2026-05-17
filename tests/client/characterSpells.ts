import type { APIRequestContext } from "@playwright/test";
import type { PutCharacterSpellsRequest } from "../types/characterRequest.js";

export async function getSpellsOptions(
    request: APIRequestContext,
    token: string,
    charId: number,
) {

    const response = await request.get('/api/characters/' + charId + '/spell-options', {
        headers: { Authorization: 'Bearer ' + token },
    });

    const spellsOptionsResponse = await response.json();

    return { response, spellsOptionsResponse };
    
};

export async function getSpellsSelection(
    request : APIRequestContext,
    token: string,
    charId: number,
) {

    const response = await request.get('/api/characters/' + charId + '/spell-selection', {
        headers: { Authorization: 'Bearer ' + token },
    });

    const spellsSelectionResponse = await response.json();

    return { response, spellsSelectionResponse };
    
};

export async function putCharacterSpells(
    request : APIRequestContext,
    token: string,
    charId: number,
    data: PutCharacterSpellsRequest,
) {

    const response = await request.put('/api/characters/' + charId +'/spells',{
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const characterSpellsResponse = await response.json();

    return { response, characterSpellsResponse };
    
}
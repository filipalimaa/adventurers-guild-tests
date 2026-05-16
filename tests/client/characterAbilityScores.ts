import type { APIRequestContext } from "@playwright/test";
import type { AbilityScoreResponsePut } from "../types/characterResponse.js";
import type { PutAbilityScoresRequest } from "../types/characterRequest.js";

export async function getAbilityScores(
    request : APIRequestContext,
    token: string,
    charId: number,
) {
    
    const response = await request.get('/api/characters/' + charId + '/ability-score-options', {
        headers: { Authorization: 'Bearer ' + token },
    });

    const abilityScoresResponse = await response.json();

    return { response, abilityScoresResponse }
};

export async function characterAbilityScoresPut(
    request : APIRequestContext,
    token: string,
    charId: number,
    data: PutAbilityScoresRequest,
) {

    const response = await request.put('/api/characters/' + charId + '/ability-scores', {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const characterAbilityScoresResponse = await response.json();

    return { response, characterAbilityScoresResponse};
    
};

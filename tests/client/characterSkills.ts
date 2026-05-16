import type { APIRequestContext } from "@playwright/test";

export async function getSkillsProficiencies(
    request : APIRequestContext,
    token: string,
    charId: number
) {

    const response = await request.get('/api/characters/' + charId + '/skills', {
        headers: { Authorization: 'Bearer ' + token}
    });

    const skillsProficienciesResponse = await response.json();

    return { response, skillsProficienciesResponse};
};
import type { APIRequestContext } from "@playwright/test";
import type { PostBackgroundChoiceRequest, PostClassChoiceRequest, PostEquipmentRequest } from "../types/characterRequest.js";

export async function equipmentClassChoice(
    request : APIRequestContext,
    token: string,
    charId: number,
    data: PostClassChoiceRequest,
) {

    const response = await request.post('/api/characters/' + charId +'/equipment/class-choice', {
        headers: { Authorization: 'Bearer ' + token },
        data
    });

    const equipmentClassChoiceResponse = await response.json();

    return { response, equipmentClassChoiceResponse }
    
};

export async function equipmentBackgroundChoice(
    request : APIRequestContext,
    token: string,
    charId: number,
    data: PostBackgroundChoiceRequest,
) {

    const response = await request.post('/api/characters/' + charId + '/equipment/background-choice', {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const equipmentBackgroundChoiceResponse = await response.json();

    return { response, equipmentBackgroundChoiceResponse };
    
};

export async function characterEquipment(
    request: APIRequestContext,
    token: string,
    charId: number,
    data: PostEquipmentRequest,
) {

    const response = await request.post('/api/characters/' + charId + '/equipment', {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    const characterEquipmentResponse = await response.json();

    return { response, characterEquipmentResponse };
    
}
import type { AbilityScoresValues, CharacterAbilityScore, CharacterRequestBackgroundPatch, CharacterRequestClassPatch, CharacterRequestPost, CharacterRequestSpeciesPatch, PutAbilityScoresRequest } from "../types/characterRequest.js";

export const CHARACTER_NAME: CharacterRequestPost = {
    name: 'Filara, the Wandering Sage',
};

export const CHARACTER_CLASSId: CharacterRequestClassPatch = {
    classId: 12,
};

export const CHARACTER_SPECIESId: CharacterRequestSpeciesPatch = {
    speciesId: 4,
};

export const CHARACTER_BACKGROUNDId: CharacterRequestBackgroundPatch = {
    backgroundId: 13,
};

export const ABILITYSCORESBASE_VALUES: AbilityScoresValues = {
    STR: 8,
    DEX: 14,
    CON: 13,
    INT: 15,
    WIS: 12,
    CHA: 8,
};

export const ABILITYSCORESBONUSES_VALUES: AbilityScoresValues = {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 2,
    WIS: 1,
    CHA: 0,
};

export const ABILITYSCORES: CharacterAbilityScore = {
    base: ABILITYSCORESBASE_VALUES,
    bonuses: ABILITYSCORESBONUSES_VALUES,
};

export const CHARACTER_ABILITYSCORES: PutAbilityScoresRequest = {
    abilityScores: ABILITYSCORES,
};
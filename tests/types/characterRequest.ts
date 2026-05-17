export interface CharacterRequestPost {
    name: string,
};

export interface CharacterRequestClassPatch {
    classId: number,
};

export interface CharacterRequestSpeciesPatch {
    speciesId: number,
};

export interface CharacterRequestBackgroundPatch {
    backgroundId: number,
};

export interface AbilityScoresValues {
    STR: number,
    DEX: number,
    CON: number,
    INT: number,
    WIS: number,
    CHA: number,
};

export interface CharacterAbilityScore {
    base: AbilityScoresValues,
    bonuses: AbilityScoresValues,
};

export interface PutAbilityScoresRequest {
    abilityScores: CharacterAbilityScore,
};

export interface PatchCharacterSkills {
    skillProficiencies: string[],
};

export interface PostClassChoiceRequest {
    optionLabel: string,
};

export interface PostBackgroundChoiceRequest {
    optionIndex: number,
};

export interface PostEquipmentRequest {
    equipmentId: number,
    quantity: number,
    isEquipped: boolean,
}
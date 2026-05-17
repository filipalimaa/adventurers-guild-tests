import type { AbilityScoresValues } from "./characterRequest.js";

interface ArmorClass {
    total: number,
    base: number,
    dexModifierApplied: number,
    classBonus: number,
    shieldBonus: number,
    sources: string[]
};

interface InventoryWeight {
    total: number,
    unit: string,
    sources: string[],
};

interface SpellCastingSummary {
    canCastSpells: boolean,
    ability: string | null,
    abilityModifier: string | null,
    spellSaveDc: string | null,
    spellAttackBonus: string | null,
    selectedSpellsCount: number,
    selectedCantripsCount: number,
};

export interface CharacterResponsePost {
    id: number,
    name: string,
    status: string,
    classId: number | null,
    speciesId: number | null,
    backgroundId: number | null,
    level: number,
    missingFields: string[],
    pendingChoices: string[],
    abilityScores: string | null,
    abilityModifiers: string | null,
    armorClass: ArmorClass,
    weaponAttacks: string[],
    hitpoints: string | null,
    savingThrows: string[],
    initiative: string | null,
    passivePerception: string | null,
    movement: string | null,
    inventoryWeight: InventoryWeight,
    spellcastingSummary: SpellCastingSummary,
    spellSlots: string[],
    selectedSpells: string[],
    currency: string | null,
    skillProficiencies: string[],
    abilityScoreRules: string | null,
    classDetails: string | null,
    speciesDetails: string | null,
    backgroundDetails: string | null,
};

interface BonusChoice {
    bonus: number;
    count: number;
    mustBeDifferentFromBonus: number;
};

interface BonusOption {
    type: string;
    choices: BonusChoice[];
};

interface BonusRules {
    mode: string;
    options: BonusOption[];
};

interface SelectionRules {
    source: string;
    allowedChoices: string[];
    bonusRules: BonusRules;
};

interface SelectedAbilityScores {
    base: AbilityScoresValues;
    bonuses: AbilityScoresValues;
    final: AbilityScoresValues;
};

export interface AbilityScoreResponsePut {
    characterId: number,
    backgroundId: number,
    backgroundName: string,
    selectionRules: SelectionRules,
    selectedAbilityScores: SelectedAbilityScores | null,
    availableChoices: string[],
};

export interface GetSkillsResponse {
    name: string,
    ability: string,
    isProficient: boolean,
    abilityModifier: number,
    proficiencyBonus: number,
    total: number,
};

export interface CharacterEquipmentAuxiliar{
    id: number,
    name: string,
    category: string,
    type: string,
    quantity: number,
    isEquipped: boolean,
};

export interface CharacterEquipmentResponse {
    characterId: number,
    equipment: CharacterEquipmentAuxiliar[],
};

export interface AppliedChoiceAuxiliar {
    source: string,
    label: string,
    optionIndex: number,
};

export interface AddedEquipmentAuxiliar {
    id: number,
    name: string,
    quantity: number,
    isEquipped: boolean,
};

export interface AddedCurrencyAuxiliar {
    cp: number,
    sp: number,
    ep: number,
    gp: number,
    pp:number,
};

export interface SkippedItemAuxiliar {
    name: string,
    reason: string,
};

export interface EquipmentPackageChoiceResponse {
    characterId: number,
    appliedChoice: AppliedChoiceAuxiliar,
    addedEquipment: AddedEquipmentAuxiliar[],
    addedCurrency: AddedCurrencyAuxiliar,
    skippedItems: SkippedItemAuxiliar[],
    pendingChoices: string[],
    equipment: CharacterEquipmentAuxiliar[],
};

export interface AvailableChoicesAuxiliar {
    id: number,
    name: string,
    level: number,
    levelLabel: string,
};

export interface SpellOptionsResponse {
    characterId: number,
    classId: number,
    className: string,
    spells: AvailableChoicesAuxiliar[],
};

export interface CharacterSpellsResponse {
    characterId: number,
    classId: number,
    className: string,
    level: number,
    selectionRules: SelectionRules,
    selectedSpells: AvailableChoicesAuxiliar[],
    availableSpells: AvailableChoicesAuxiliar[] 
}
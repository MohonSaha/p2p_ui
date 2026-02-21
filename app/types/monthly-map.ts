export type GoalValueType = "boolean" | "text";

export interface Goal {
  id: string;
  name: string;
  valueType: GoalValueType;
}

export interface CellEntry {
  goalId: string;
  date: string; // YYYY-MM-DD
  value: string; // "true"/"false" for boolean, free text/number for text
}

export interface MonthData {
  month: string; // YYYY-MM format
  goals: Goal[];
  entries: CellEntry[];
}

// Backend model suggestion (Sequelize-style):
//
// Goal model:
// {
//   id: INTEGER.UNSIGNED, primaryKey, autoIncrement
//   name: STRING, allowNull: false
//   valueType: ENUM('boolean', 'text'), allowNull: false
//   month: STRING(7), allowNull: false  // e.g. "2026-03"
//   isDeleted: BOOLEAN, defaultValue: false
//   created_at, updated_at
// }
//
// GoalEntry model:
// {
//   id: INTEGER.UNSIGNED, primaryKey, autoIncrement
//   goalId: INTEGER.UNSIGNED, references Goal.id
//   entryDate: DATEONLY, allowNull: false
//   value: STRING, allowNull: true  // stores "true"/"false" or text/number
//   isDeleted: BOOLEAN, defaultValue: false
//   created_at, updated_at
// }

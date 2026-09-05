// Deterministic safety net checked BEFORE any message reaches the model. Faster and more
// reliable than trusting the LLM to always catch an emergency — see docs/CHATBOT_PLAN.md §3.
const EMERGENCY_PATTERNS = [
  /chest pain/i,
  /can'?t breathe/i,
  /cannot breathe/i,
  /difficulty breathing/i,
  /trouble breathing/i,
  /unconscious/i,
  /unresponsive/i,
  /not breathing/i,
  /heavy bleeding/i,
  /profuse bleeding/i,
  /severe bleeding/i,
  /uncontrolled bleeding/i,
  /\bstroke\b/i,
  /paralysis/i,
  /seizure/i,
  /fitting/i,
  /convuls/i,
  /suicide/i,
  /kill myself/i,
  /end my life/i,
  /self[\s-]?harm/i,
  /overdose/i,
  /poisoning/i,
  /snake bite/i,
  /road accident/i,
  /severe accident/i,
  /heart attack/i,
  /cardiac arrest/i,
  /choking/i,
  /severe burn/i,
  /high fever.*(baby|infant|newborn)/i,
];

export function isEmergencyMessage(text: string): boolean {
  return EMERGENCY_PATTERNS.some((pattern) => pattern.test(text));
}

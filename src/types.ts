export interface ConditionalEntityRowConfig {
  type: string;
  entity: string;
  condition: ConditionalEntityRowConfigCondition;
}

interface ConditionalEntityRowConfigCondition {
  entity: string;
  state: string;
}

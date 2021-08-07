export enum CLI {
  ROUTER = 'Router#',
  ROUTER_CONFIG = 'Router(config)#',
  ROUTER_CONFIG_IF = 'Router(config-if)#',
  ROUTER_CONFIG_EXT_NACL = 'Router(config-ext-nacl)#',
  ROUTER_CONFIG_ISAKMP = 'Router(config-isakmp)#',
  ROUTER_CONFIG_CRYPTO_MAP = 'Router(config-crypto-map)#',
}

export enum AnswerStatus {
  DID_NOT_CHECK = '1',
  CORRECT = '2',
  INCORRECT = '3',
  SHOW_ANSWER = '4',
}

export const AnswerMessage: Record<AnswerStatus, string> = {
  [AnswerStatus.CORRECT]: 'ПРАВИЛЬНО',
  [AnswerStatus.INCORRECT]: 'НЕПРАВИЛЬНО',
  [AnswerStatus.DID_NOT_CHECK]: '',
  [AnswerStatus.SHOW_ANSWER]: '',
};

export const AnswerMessageStyle: Record<AnswerStatus, string> = {
  [AnswerStatus.CORRECT]: 'correct',
  [AnswerStatus.INCORRECT]: 'incorrect',
  [AnswerStatus.DID_NOT_CHECK]: '',
  [AnswerStatus.SHOW_ANSWER]: '',
};

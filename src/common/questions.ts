import { CLI } from './constants';
import { IQuestions, IQuizzes } from './models';

// tslint:disable:max-line-length

/**
 * CLI маршрутизатора центрального офиса (Router0)
 */
const questions1: IQuestions = [
  // конфигурация
  {
    precondition: CLI.ROUTER,
    question: 'Конфигурация из терминала.',
    answer: 'conf t',
  },
  // первый интерфейс fa0/0
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/0.',
    answer: 'int fa0/0',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Настройка всех ip-адресов на внешние.',
    answer: 'ip nat outside',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // второй интерфейс fa0/1
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/1.',
    answer: 'int fa0/1',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Настройка всех ip-адресов на внутренние.',
    answer: 'ip nat inside',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // создание ACL
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Введите команду для создания унаследованного списка доступа (ACL - access list) с названием FOR-NAT.',
    answer: 'ip access-list extended FOR-NAT',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Запретить передачу трафика с 192.168.1.0 на 192.168.2.0 (маска 0.0.0.255).',
    answer: 'deny ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Разрешить весь остальной трафик с 192.168.1.0 (маска 0.0.0.255).',
    answer: 'permit ip 192.168.1.0 0.0.0.255 any',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Выход.',
    answer: 'exit',
  },
  // привязываем ACL
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Привязываем созданный лист доступа FOR-NAT.',
    answer: 'ip nat inside source list FOR-NAT interface fa0/0 overload',
  },
  // сохраняем
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Завершить.',
    answer: 'end',
  },
  {
    precondition: CLI.ROUTER,
    question: 'Сохранить.',
    answer: 'wr mem',
  },
];

/**
 * CLI маршрутизатора филиала (Router1)
 */
const questions2: IQuestions = [
  // конфигурация
  {
    precondition: CLI.ROUTER,
    question: 'Конфигурация из терминала.',
    answer: 'conf t',
  },
  // первый интерфейс fa0/0
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/0.',
    answer: 'int fa0/0',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Настройка всех ip-адресов на внешние.',
    answer: 'ip nat outside',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // второй интерфейс fa0/1
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/1.',
    answer: 'int fa0/1',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Настройка всех ip-адресов на внутренние.',
    answer: 'ip nat inside',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // создание ACL
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Введите команду для создания унаследованного списка доступа (ACL - access list) с названием FOR-NAT.',
    answer: 'ip access-list extended FOR-NAT',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Запретить передачу трафика с 192.168.2.0 на 192.168.1.0 (маска 0.0.0.255).',
    answer: 'deny ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Разрешить весь остальной трафик с 192.168.2.0 (маска 0.0.0.255).',
    answer: 'permit ip 192.168.2.0 0.0.0.255 any',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Выход.',
    answer: 'exit',
  },
  // привязываем ACL
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Привязываем созданный лист доступа FOR-NAT.',
    answer: 'ip nat inside source list FOR-NAT interface fa0/0 overload',
  },
  // сохраняем
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Завершить.',
    answer: 'end',
  },
  {
    precondition: CLI.ROUTER,
    question: 'Сохранить.',
    answer: 'wr mem',
  },
];

/**
 * VPN. CLI маршрутизатора центрального офиса (Router0)
 */
const questions3: IQuestions = [
  // конфигурация
  {
    precondition: CLI.ROUTER,
    question: 'Конфигурация из терминала.',
    answer: 'conf t',
  },
  // создание политики
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Создать политику.',
    answer: 'crypto isakmp policy 1',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Задать алгоритм шифрования Triple DES.',
    answer: 'encryption 3des',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Указать алгоритм хеширования MD5.',
    answer: 'hash md5',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Указать тип аутентификации "pre-share".',
    answer: 'authentication pre-share',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Задать алгоритм обмена ключами.',
    answer: 'group 2',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Выход.',
    answer: 'exit',
  },
  // задание ключа и пира
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Настроить значение pre-share ключа "cisco" и задать адрес пира (маршрутизатор, с которого сторится VPN) - адрес внешнего интерфейса маршрутизатора в филиале (210.210.2.2).',
    answer: 'crypto isakmp key cisco address 210.210.2.2',
  },
  // задание параметров IPSec
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Задать параметры построения IPSec тоннеля с названием "TS".',
    answer: 'crypto ipsec transform-set TS esp-3des esp-md5-hmac',
  },
  // создание ACL для VPN
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Введите команду для создания унаследованного списка доступа (ACL - access list) с названием FOR-VPN.',
    answer: 'ip access-list extended FOR-VPN',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Разрешить передачу трафика с 192.168.1.0 на 192.168.2.0 (маска 0.0.0.255).',
    answer: 'permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Выход.',
    answer: 'exit',
  },
  // создание крипто-карты
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Создать крипто-карту с названием "CMAP".',
    answer: 'crypto map CMAP 10 ipsec-isakmp',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать пир (адрес внешнего интерфейса маршрутизатора в филиале - 210.210.2.2).',
    answer: 'set peer 210.210.2.2',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать параметры IPSec тоннеля ("TS").',
    answer: 'set transform-set TS',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать трафик, который необходимо шифровать ("FOR-VPN").',
    answer: 'match address FOR-VPN',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Выход.',
    answer: 'exit',
  },
  // привязка крипто-карты
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/0.',
    answer: 'int fa0/0',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Привязка криптокарты "CMAP".',
    answer: 'crypto map CMAP',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // сохраняем
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Завершить.',
    answer: 'end',
  },
  {
    precondition: CLI.ROUTER,
    question: 'Сохранить.',
    answer: 'wr mem',
  },
];

/**
 * VPN. CLI маршрутизатора филиала (Router1)
 */
const questions4: IQuestions = [
  // конфигурация
  {
    precondition: CLI.ROUTER,
    question: 'Конфигурация из терминала.',
    answer: 'conf t',
  },
  // создание политики
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Создать политику.',
    answer: 'crypto isakmp policy 1',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Задать алгоритм шифрования Triple DES.',
    answer: 'encryption 3des',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Указать алгоритм хеширования MD5.',
    answer: 'hash md5',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Указать тип аутентификации "pre-share".',
    answer: 'authentication pre-share',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Задать алгоритм обмена ключами.',
    answer: 'group 2',
  },
  {
    precondition: CLI.ROUTER_CONFIG_ISAKMP,
    question: 'Выход.',
    answer: 'exit',
  },
  // задание ключа и пира
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Настроить значение pre-share ключа "cisco" и задать адрес пира (маршрутизатор, с которого сторится VPN) - адрес внешнего интерфейса маршрутизатора в центральном офисе (210.210.2.2).',
    answer: 'crypto isakmp key cisco address 210.210.1.2',
  },
  // задание параметров IPSec
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Задать параметры построения IPSec тоннеля с названием "TS".',
    answer: 'crypto ipsec transform-set TS esp-3des esp-md5-hmac',
  },
  // создание ACL для VPN
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Введите команду для создания унаследованного списка доступа (ACL - access list) с названием FOR-VPN.',
    answer: 'ip access-list extended FOR-VPN',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Разрешить передачу трафика с 192.168.2.0 на 192.168.1.0 (маска 0.0.0.255).',
    answer: 'permit ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255',
  },
  {
    precondition: CLI.ROUTER_CONFIG_EXT_NACL,
    question: 'Выход.',
    answer: 'exit',
  },
  // создание крипто-карты
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Создать крипто-карту с названием "CMAP".',
    answer: 'crypto map CMAP 10 ipsec-isakmp',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать пир (адрес внешнего интерфейса маршрутизатора в центральном офисе - 210.210.1.2).',
    answer: 'set peer 210.210.1.2',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать параметры IPSec тоннеля ("TS").',
    answer: 'set transform-set TS',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Указать трафик, который необходимо шифровать ("FOR-VPN").',
    answer: 'match address FOR-VPN',
  },
  {
    precondition: CLI.ROUTER_CONFIG_CRYPTO_MAP,
    question: 'Выход.',
    answer: 'exit',
  },
  // привязка крипто-карты
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Конфигурация интерфейса Fast Ethernet - fa0/0.',
    answer: 'int fa0/0',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Привязка криптокарты "CMAP".',
    answer: 'crypto map CMAP',
  },
  {
    precondition: CLI.ROUTER_CONFIG_IF,
    question: 'Выход.',
    answer: 'exit',
  },
  // сохраняем
  {
    precondition: CLI.ROUTER_CONFIG,
    question: 'Завершить.',
    answer: 'end',
  },
  {
    precondition: CLI.ROUTER,
    question: 'Сохранить.',
    answer: 'wr mem',
  },
];

export const quizzes: IQuizzes = [
  {
    title: 'Настройка маршрутизатора центрального офиса (Router0).',
    questions: questions1,
  },
  {
    title: 'Настройка маршрутизатора филиала (Router1).',
    questions: questions2,
  },
  {
    title: 'Настройка VPN на маршрутизаторе центрального офиса (Router0)',
    questions: questions3,
  },
  {
    title: 'Настройка VPN на маршрутизаторе филиала (Router1)',
    questions: questions4,
  },
];

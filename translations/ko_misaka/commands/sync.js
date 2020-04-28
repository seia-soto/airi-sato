module.exports = {
  notFromGuildOwner: '서버 동기화는 서버 소유자만 사용할 수 있다고 말하며 미사카는 어이없다고 생각합니다.',
  sync: '서버 동기화',
  syncDescription: '특정 서버의 구성 설정을 현재 서버로 가져옵니다. `all` 키워드를 사용하면 모든 옵션을 사용하게 되는 거라고 미사카는 알려줍니다.\n> sync <scope> <sourceServerID>',
  localizedScopeNames: {
    ban: '차단 목록'
  },
  scopeDescriptions: {
    ban: '서버의 차단 목록을 가져오는 옵션이라고 미사카는 알려줍니다.'
  },
  syncBetweenDifferentOwner: '동기화하려는 서버와 하는 서버의 소유자는 같아야 한다고 미사카는 주장합니다.',
  targetGuildNotExists: '구성 설정을 가져오려는 서버가 존재하지 않거나 서버에 초대되지 않았다고 미사카는 자신만 빼놓고 파티한 점에 대해 불만을 말합니다.',
  synchronizing: '현재 `{source}` 서버에서 요청한 항목을 동기화하는 중입니다. 이 작업에는 시간이 걸릴 수 있다고 미사카는 기다려달라고 말해둡니다.',
  synchronized: '`{source}` 서버에서 요청한 항목을 동기화했습니다. 자세한 사항은 서버의 감사 로그를 확인하라고 미사카는 알려줍니다.',
  ratelimited: '과도한 API 요청을 막기 위해 명령어 사용이 제한되었습니다. 이미 동기화가 실행 중이거나 최근에 실행한 경우에는 잠시 후에 다시시도해야 한다고 미사카는 지적합니다.',
  permissionLack: '`{permission}` 권한을 사용할 수 없어 현재 작업을 중지했습니다. 권한을 설정하고 다시시도해야 한다고 미사카는 말합니다.',
  localizedPermissionNames: {
    banMembers: '멤버 차단하기'
  }
}

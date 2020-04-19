import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const vars = [
    ['player_id','The id of the hitbox’s original owner'],
    ['player','The player number of the hitbox’s current owner (changes when parried)'],
    ['orig_player','The player number of the hitbox’s original owner'],
    ['attack','The attack index of the hitbox'],
    ['hbox_num','The index of the hitbox'],
    ['hitbox_timer','The number of frames the hitbox has been active'],
    ['destroyed','Setting this to true will destroy the hitbox (projectiles only)'],
    ['was_parried','Whether the hitbox has been parried or not'],
    ['in_hitpause','Whether the hitbox is in hitpause or not'],
    ['proj_angle','The angle of rotation applied to a projectile’s sprite'],
    ['through_platforms','When greater than 1, the projectile will not stop at the top of platforms. Decreases by 1 automatically every frame'],
    ['free','Whether the projectile is in the air or not'],
  ]

  return [
    ...vars.map(([varName, desc]) => {
      return {
        label: varName,
        kind: CompletionItemKind.Constant,
        documentation: desc,
        insertText: varName
      }
    }),
  ]
}

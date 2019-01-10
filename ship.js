const ship = {
  fuel: {
    reserve: 0,
    consumptionRate: 0,
  },
  demensions: {
    width: 0,
    length: 0,
    shape: 'triangle',
  },
  health: 0,
  mass: 0,
  boosterPower: 0,
  antiGravity: {
    active: false,
    duration: 0,
    cooldown: 0,
  },
}

///////////
// Rules //
///////////
//
// When booster is activated,
// - fuel `reserve` is used at a `consumptionRate`
// - ships velocity is increased by the `boosterPower`
//
// If fuel reserve is gone, booster can no longer be used
//
// When antiGravity equipment is used,
// - gravity vectors are removed from ship for `duration` or until equipment is deactivated
// - cooldown is started once equipment becomes `inactive` or `duration` runs out
//
// If a ship runs into a planet, not on it's landers, it loses health
//
// If a ship runs into a planet on it's landers, but going too fast, it loses health
//
// The level is failed if,
// - the ship health reaches 0,
// - the fuel reserve reaches 0,
//
// The level is complete if,
// - the `end` (x,y) is reached (the ship demensions occupy the same x,y) and
// - the `start` is returned to
//

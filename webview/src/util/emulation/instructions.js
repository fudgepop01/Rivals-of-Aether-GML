import functions from "./functionHandler";
import currentItems from './currentItems';
import constants from './constantLookup';

import { get } from "svelte/store";
import { debugTypeIndex } from '../../store/renderOptions';

const LOOP_LIMIT = 100000;
const checkInterrupt = (inst, i, [loopType,,{row, col}], gameState) => {
  if (['CONTINUE', 'BREAK'].includes(inst)) {
    gameState.scopes.pop();
    if (inst === 'CONTINUE') return 'c';
    else return 'b';
  }
  if (i >= LOOP_LIMIT) {
    gameState.scopes.pop();
    console.warn(`${loopType} loop at [${row}, ${col}] has reached at least ${LOOP_LIMIT} iterations, forcing break statement...`)
    return 'b';
  }
}

const getScopeRef = ([code,,, ...args], gameState) => {
  switch(code) {
    case 'Local':
      const currentScopeVal = gameState.scopes[gameState.scopes.length - 1][args[0]];
      if (currentScopeVal !== undefined) {
        return [gameState.scopes[gameState.scopes.length - 1], args[0]];
      } else {
        for (let i = gameState.scopes.length - 2; i >= 0; i--) {
          let prevScopeVal = gameState.scopes[i][args[0]];
          if (prevScopeVal !== undefined) return [gameState.scopes[i], args[0]];
          else continue;
        }
      }
      break;
    case 'Global':
      return gameState.globals;
    case 'Field':
      const instVal = getData(args[0]);
      if (instVal === 'Self') {
        if (gameState.context) return [gameState.context.fields, args[1]];
        else return [gameState.instances.self.fields, args[1]];
      } else {
        debugger;
        return instVal[fieldName];
      }

    case 'DsMap':
    case 'DsList':
    case 'Index':
      return [getData(args[0]), getData(args[1])];

    case 'DsGrid':
    case 'Index2d':
      return [getData(args[0])[getData(args[1])], getData(args[2])];
  }
}

const BinOps = (operation, a, b) => {
  return ({
    0x00(){return a * b},
    0x01(){return a / b},
    0x02(){return a % b},
    0x03(){return Math.floor(a / b)},

    0x10(){return a + b},
    0x11(){return a - b},
    0x12(){debugger;}, // because I have NO IDEA what Cct means

    0x20(){return a << b},
    0x21(){return a >> b},

    0x30(){return a | b},
    0x31(){return a & b},
    0x32(){return a ^ b},

    0x40(){return a === b;},
    0x41(){return a !== b},
    0x42(){return a < b},
    0x43(){return a <= b},
    0x44(){return a > b},
    0x45(){return a >= b}, // nice

    0x50(){return a && b},
    0x60(){return a || b}
  })[operation]();
}

export const nodeTypes = (gameState) => {
  return {
    Undefined(){}, // 0
    Number(value, src){ // 1
      return value;
    },
    CString(value){ // 2
      return value;
    },
    EnumCtr(e, ctr){ // 3
      // TODO: ADD NEW CASE FOR ENUMS
    },
    ArrayDecl(values){ // 4
      const out = [];
      for (const value of values) {
        out.push(getData(value, gameState))
      }
      return out;
    },
    ObjectDecl(keys, values){ // 5
      const out = {
        __type: 'lightweight',
      };
      for (const [i, key] of keys.entries()) {
        out[key] = getData(values[i], gameState);
      }
      return out;
    },
    EnsureArray(expr){
      const [ref, varName] = getScopeRef(expr, gameState);
      if (!Array.isArray(ref[varName])) ref[varName] = [];
    },
    Ident(id){},
    Self(){
      return 'Self';
    },
    Other(){},
    GlobalRef(){ // 10
      return gameState.globals;
    },
    Script(ref){
      debugger;
    },
    Const(id){
      return gameState.consts[id];
    },
    // TODO
    ArgConst(id){},
    ArgIndex(id){},
    ArgCount(){}, // 15
    Call(x, args){
      debugger;
    },
    CallScript(name, args){
      debugger;
    },
    CallScriptAt(instance, script, args){
      debugger;
    },
    CallScriptId(index, args){
      debugger;
    },
    CallField(instance, prop, args){
      debugger;
    }, // 20

    CallFunc(name, args){
      const handlers = {
        default(){},
        ...functions(gameState)
      }

      return (handlers[name] || handlers['default'])(...args);
    },
    CallFuncAt(x, s, args){},
    Prefix(x, inc){
      const [ref, varName] = getScopeRef(x, gameState);
      ref[varName] += inc ? 1 : -1;
      return ref[varName];
    },
    Postfix(x, inc){
      const [ref, varName] = getScopeRef(x, gameState);
      let out = ref[varName];
      ref[varName] += inc ? 1 : -1;
      return out;
    },
    UnOp(x, operation){ // 25
      return ({
        0(){return -x}, // DecNot
        1(){return !getData(x)}, // LogNot
        2(){return ~x} // BitNot
      })[operation]();
    },
    BinOp(operation, a, b){
      const ad = getData(a, gameState);
      const bd = getData(b, gameState)
      return BinOps(operation, ad, bd);
    },
    SetOp(operation, a, b){
      // possibly unused in this case
    },
    ToBool(v){
      // appears to be internal only...?
      return getData(v);
    },
    FromBool(v){
      return getData(v);
    },
    In(fd, val, not){}, // 30
    Local(varName){
      const currentScopeVal = gameState.scopes[gameState.scopes.length - 1][varName];
      if (currentScopeVal !== undefined) {
        return currentScopeVal;
      } else {
        for (let i = gameState.scopes.length - 2; i >= 0; i--) {
          let prevScopeVal = gameState.scopes[i][varName];
          if (prevScopeVal !== undefined) return prevScopeVal;
        }
      }
      return 'WTF_LOCAL_NOT_FOUND';
    },
    LocalSet(varName, val){
      const currentScopeVal = gameState.scopes[gameState.scopes.length - 1][varName];
      if (currentScopeVal !== undefined) {
        gameState.scopes[gameState.scopes.length - 1][varName] = getData(val);
      } else {
        for (let i = gameState.scopes.length - 2; i >= 0; i--) {
          let prevScopeVal = gameState.scopes[i][varName];
          if (prevScopeVal !== undefined) {
            gameState.scopes[i][varName] = getData(val);
            break;
          }
        }
      }
    },
    LocalAop(varName, operation, val){
      const currentScopeVal = gameState.scopes[gameState.scopes.length - 1][varName];
      if (currentScopeVal !== undefined) {
        gameState.scopes[gameState.scopes.length - 1][varName] = BinOps(operation, currentScopeVal, getData(val));
      } else {
        for (let i = gameState.scopes.length - 2; i >= 0; i--) {
          let prevScopeVal = gameState.scopes[i][varName];
          if (prevScopeVal !== undefined) {
            gameState.scopes[i][varName] = BinOps(operation, prevScopeVal, getData(val));
            break;
          }
        }
      }
    },
    // RoA doesn't allow access to global scope
    Global(varName){
      // return gameState.globals[varName];
    },
    GlobalSet(varName, val){ // 35
      //gameState.globals[varName] = getData(val);
    },
    GlobalAop(varName, operation, val){
      //gameState.globals[varName] = BinOps(operation, gameState.globals[varName], getData(val));
    },
    Field(instance, fieldName){
      if (Object.keys(constants).includes(fieldName)) return constants[fieldName];

      const instVal = getData(instance);
      if (instVal === 'Self') {
        if (gameState.context) {
          return gameState.context.fields[fieldName];
        } else {
          return gameState.instances.self.fields[fieldName];
        }
      } else {
        return instVal[fieldName];
        debugger;
      }
    },
    FieldSet(instance, fieldName, val){
      // HOOK FOR VISUALIZER CODE INJECTION
      if (fieldName === 'DEBUG_TYPES') {
        gameState.instances.self.fields['DEBUG_TYPE'] = getData(val).split(',')[get(debugTypeIndex)];
      }

      const instVal = getData(instance);
      if (instVal === 'Self') {
        if (gameState.context) gameState.context.fields[fieldName] = getData(val);
        else gameState.instances.self.fields[fieldName] = getData(val);
      } else {
        instVal[fieldName] = getData(val);
        debugger;
      }
    },
    FieldAop(instance, fieldName, operation, val){
      const instVal = getData(instance);
      if (instVal === 'Self') {
        let ctx = gameState.context;
        if (!ctx) ctx = gameState.instances.self;
        ctx.fields[fieldName] = BinOps(
          operation,
          ctx.fields[fieldName],
          getData(val)
        );
      } else {
        instVal[fieldName] = getData(val);
        debugger;
      }
    },
    // likely unused, but added debugger statements to be safe
    Env(id){debugger;}, // 40
    EnvSet(id, val){debugger;},
    EnvAop(id, op, val){debugger;},
    EnvFd(x, fd){debugger;},
    EnvFdSet(x, fd, v){debugger;},
    EnvFdAop(x, fd, op, v){debugger;}, // 45
    Env1d(id, k){debugger;},
    Env1dSet(id, k, val){debugger;},
    Env1dAop(id, k, op, val){debugger;},

    Index(varRef, id){
      return getData(varRef)[getData(id)];
    },
    IndexSet(varRef, id, val){
      getData(varRef)[getData(id)] = getData(val);
    }, // 50
    IndexAop(varRef, id, operation, val){
      getData(varRef)[getData(id)] = BinOps(operation, getData(varRef)[getData(id)], getData(val));
    },
    IndexPrefix(varRef, i, inc){},
    IndexPostfix(varRef, i, inc){},
    Index2d(varRef, i1, i2){
      return getData(varRef)[getData(i1)][getData(i2)];
    },
    Index2dSet(varRef, i1, i2, val){
      getData(varRef)[getData(i1)][getData(i2)] = getData(val);
    }, // 55
    Index2dAop(varRef, i1, i2, operation, val){
      getData(varRef)[getData(i1)][getData(i2)] = BinOps(operation, getData(varRef)[getData(i1)][getData(i2)], getData(val))
    },
    Index2dPrefix(varRef, i, k, inc){},
    Index2dPostfix(varRef, i, k, inc){},

    RawId(x, id){
      return getData(x)[getData(id)];
    },
    RawIdSet(varRef, id, v){
      getData(varRef)[getData(id)] = getData(v);
    }, // 60
    RawIdAop(varRef, id, operation, val){
      getData(varRef)[getData(id)] = BinOps(operation, getData(varRef)[getData(id)], getData(val));
    },
    RawIdPrefix(x, i, inc){},
    RawIdPostfix(x, i, inc){},
    RawId2d(varRef, i1, i2){
      return getData(varRef)[getData(i1)][getData(i2)];
    },
    RawId2dSet(varRef, i1, i2, val){
      getData(varRef)[getData(i1)][getData(i2)] = getData(val);
    }, // 65
    RawId2dAop(varRef, i1, i2, operation, val){
      getData(varRef)[getData(i1)][getData(i2)] = BinOps(operation, getData(varRef)[getData(i1)][getData(i2)], getData(val))
    },
    RawId2dPrefix(x, i, k, inc){},
    RawId2dPostfix(x, i, k, inc){},

    DsList(listVar, id){
      return getData(listVar)[getData(id)];
    },
    DsListSet(listVar, id, value){
      getData(listVar)[getData(id)] = getData(value);
    }, // 70
    DsListAop(listVar, id, operation, value){
      getData(listVar)[getData(id)] = BinOps(operation, getData(listVar)[getData(id)], getData(value))
    },
    DsListPrefix(x, i, inc){},
    DsListPostfix(x, i, inc){},

    DsMap(mapVar, id){
      return getData(mapVar)[getData(id)];
    },
    DsMapSet(mapVar, id, value){
      getData(mapVar)[getData(id)] = getData(value);
    }, // 75
    DsMapAop(mapVar, id, operation, value){
      getData(mapVar)[getData(id)] = BinOps(operation, getData(mapVar)[getData(id)], getData(value))
    },
    DsMapPrefix(x, i, inc){},
    DsMapPostfix(x, i, inc){},

    DsGrid(gridVar, i1, i2){
      return getData(gridVar)[getData(i1)][getData(i2)];
    },
    DsGridSet(gridVar, i1, i2, val){
      getData(gridVar)[getData(i1)][getData(i2)] = getData(val);
    }, // 80
    DsGridAop(gridVar, i1, i2, operation, val){
      getData(gridVar)[getData(i1)][getData(i2)] = (operation , getData(gridVar)[getData(i1)][getData(i2)], getData(val))
    },
    DsGridPrefix(x, i, k, inc){},
    DsGridPostfix(x, i, k, inc){},

    VarDecl(name, value){
      gameState.scopes[gameState.scopes.length - 1][name] = getData(value);
      return gameState.scopes[gameState.scopes.length - 1][name];
    },
    Block(nodes){ // 85
      gameState.scopes.push({});
      for (const node of nodes) {
        let inst = getData(node, gameState);
        if (['BREAK', 'CONTINUE'].includes(inst)) {
          gameState.scopes.pop();
          return inst;
        }
      }
      gameState.scopes.pop();
    },
    IfThen(cond, then, not){
      if (getData(cond)){
        gameState.scopes.push({});
        const inst = getData(then);
        if (['CONTINUE', 'BREAK'].includes(inst)) {
          gameState.scopes.pop();
          return inst;
        }
        gameState.scopes.pop();
      } else if (not) {
        gameState.scopes.push({});
        const inst = getData(not);
        if (['CONTINUE', 'BREAK'].includes(inst)) {
          gameState.scopes.pop();
          return inst;
        }
        gameState.scopes.pop();
      }
    },
    Ternary(cond, then, not){
      if (getData(cond)){
        return getData(then);
      } else {
        return getData(not);
      }
    },
    Switch(baseExpr, list, def){
      const exprData = getData(baseExpr);
      let condMet = false;
      let defCase = true;
      for (const cond of list) {
        const {values, expr, pre} = cond;
        if (!condMet) {
          for (const val of values) {
            if (exprData === getData(val)) {
              condMet = true;
              defCase = false;
              break;
            }
          }
        }
        if (condMet) {
          const bce = checkInterrupt(getData(expr), 0, expr, gameState);
          if (bce === 'b') {
            condMet = false;
            break;
          }
        }
      }
      if ((condMet || defCase) && def) {
        getData(def);
      }
    },
    Wait(time){
      // doesn't actually work in RoA
    },
    Fork(){
      // not sure if this works in RoA or not...
      // TODO: needs more research
    }, // 90
    While(cond, node){
      let i = 0;
      while(getData(cond)) {
        gameState.scopes.push({});

        const bce = checkInterrupt(getData(node), i, node, gameState);
        if (bce === 'b') break;
        else if (bce === 'c') continue;

        gameState.scopes.pop();
      }
    },
    DoUntil(node, cond){
      let i = 0;
      while(getData(cond) === false) {
        gameState.scopes.push({});

        const bce = checkInterrupt(getData(node), i, node, gameState);
        if (bce === 'b') break;
        else if (bce === 'c') continue;

        gameState.scopes.pop();
      }
    },
    DoWhile(node, cond){
      let i = 0;
      do {
        gameState.scopes.push({});

        const bce = checkInterrupt(getData(node), i, node, gameState);
        if (bce === 'b') break;
        else if (bce === 'c') continue;
        i++;

        gameState.scopes.pop();
      } while (getData(cond) === true);
    },
    Repeat(times, node){
      for (let i = 0; i < getData(times); i++) {
        gameState.scopes.push({});

        const bce = checkInterrupt(getData(node), i, node, gameState);
        if (bce === 'b') break;
        else if (bce === 'c') continue;

        gameState.scopes.pop();
      }

    },
    For(pre, cond, post, loop){
      gameState.scopes.push({});
      let i = 0;
      for (getData(pre); getData(cond); getData(post)) {
        gameState.scopes.push({});

        const bce = checkInterrupt(getData(loop), i, loop, gameState);
        if (bce === 'b') break;
        else if (bce === 'c') continue;
        i++;

        gameState.scopes.pop();
      }
      gameState.scopes.pop();
    }, // 95
    With(ctx, node){
      const objType = getData(ctx);
      for (const [name, inst] of Object.entries(gameState.instances)) {
        if (inst.fields.object_index === objType) {
          gameState.scopes.push({});
          gameState.context = inst;
          getData(node);
          gameState.context = null;
          gameState.scopes.pop({});
        }
      }
    },
    Once(node){
      // ???
    },
    Return(v){
      return getData(v);
    },
    Exit(){},
    Break(){
      return 'BREAK';
    }, // 100
    Continue(){
      return 'CONTINUE';
    },
    Debugger(){
      debugger; // lol well that's convenient
    },
    TryCatch(node, cap, cat){
      // idk about this one
    },
    Throw(x){
      // or this one...
    },
    CommentLine(s){}, // 105
    CommentLinePre(s, x){},
    CommentLinePost(x, s){},
    CommentLineSep(s, x){},
    CommentBlock(s){},
    CommentBlockPre(s, x, pl){}, // 110
    CommentBlockPost(x, s, pl){}
  }
}

const getData = ([kind, kindID, pos, ...args], gameState, scriptName) => {
  if (!gameState) gameState = currentItems.gameState;
  else currentItems.gameState = gameState;

  if (!scriptName) scriptName = currentItems.scriptName;
  else currentItems.scriptName = scriptName;

  let dataOut = (nodeTypes(gameState))[kind](...args);
  if (dataOut !== undefined) return dataOut;

  return gameState;
}

export default getData;
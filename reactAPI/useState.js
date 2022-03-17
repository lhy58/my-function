/*
* 解析hooks源码， useState实现原理
*/
// 是否mount
let isMount = true;
let workInProgressHook = null; // 连表指针

// 节点
const fiber = {
  stateNode: App,
  memoizedState: null, // this.state
}

function useState(initialState) { 
  let hook; // 单向链表
  if (isMount) { // 首次渲染
    hook = {
      memoizedState: initialState,
      next: null, // 指针 -> 指向下一个链表
      queue: { // 存 updateNum(unm => unm + 1) 传入时改变状态
        pending: null // 队列
      }
    }
    if (!fiber.memoizedState) { // 第一个useState(0)
      fiber.memoizedState = hook;
    } else { // 第二个，第三.....
      workInProgressHook.next = hook // 形成一个链表
    }
    workInProgressHook = hook;
  } else { 
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }

  // 基础的state
  let baseState = hook.memoizedState;
  if (hook.queue.pending) { 
    let firstUpdate = hook.queue.pending.next // 第一个update

    // 遍历
    do {
      const action = firstUpdate.action; // 取出action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next // 指向下一个updata
    } while (firstUpdate !== hook.queue.pending.next) // 结束

    // 计算完后清空pending
    hook.queue.pending = null; 
  }

  // 赋值新的 baseState
  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]

}

// 状态
function dispatchAction(queue, action) { 
  const update = { // 环状链表
    action,
    next: null,
  }

  if (queue.pending === null) {
    // u0 -> u0 -> u0
    update.next = update;
  } else { 
    // u1 -> u0 -> u1
    update.next = queue.pending.next // u1 -> u0
    queue.pending.next = update; //  u0 -> u1
  }
  queue.pending = update;

  schedule();
}

function schedule() { 
  workInProgressHook = fiber.memoizedState // 初始化重新指向-> hooks
  // 首次调用
  const app = fiber.stateNode();
  isMount = false;
  return app
}


// 组件
function App() { 
  const [num, updateNum] = useState(0)
  const [num1, updateNum1] = useState(10)

  console.log('isMount', isMount)
  console.log('num', num)
  console.log('num1', num1)

  return {
    onClick() { 
      updateNum(unm => unm + 1)
    },
    onFocus() { 
      updateNum1(num => num + 10)
    }
  }
}

window.app = schedule()

// window 使用
//app.onClick()
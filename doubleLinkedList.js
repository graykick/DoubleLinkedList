function Node(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.toString = toString;
    this.find = find;
    this.remove = remove;
    this.insert = insert;
    this.isThereNode = isThereNode;
    this.clear = clear;
    this.pushFront = pushFront;
    this.pushBack = pushBack;
    this.popFront = popFront;
    this.popBack = popBack;
    this.getIndex = getIndex;
    this.getNode = getNode;
}

function getIndex(findNode) {
    var curNode = this.head;
    var result = -1;
    while (curNode !== findNode) {
        curNode = curNode.next;
        result++;
    }
    return result + 1;
}

function clear() {
    var curNode = this.head;
    while (curNode.next !== null) {
        curNode = curNode.next;
        delete curNode.prev;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;
}

function toString() {
    var result;
    if (this.head !== null) {
        var curNode = this.head;
        result = "" + this.head.element + " ";
        while (curNode.next !== null) {
            result += curNode.next.element + " ";
            curNode = curNode.next;
        }
    } else {
        result = "empty";
    }

    return result;
}

function find(value) {
    var curNode = this.head;
    while (curNode.next != null && curNode.element != value) {
        curNode = curNode.next;
    }
    return curNode;
}

function isThereNode(findNode) {
    var curNode = this.head;
    while (curNode.next !== null && curNode.next !== findNode) {
        curNode = curNode.next;
    }
    if (curNode.next === findNode) {
        return true;
    } else {
        return false;
    }
}

function remove() {
    // 리스트에서 지정한 노드를 삭제한다.
    var delNode;
    // 인자가 1개이고 Node객체인 경우
    if (arguments.length == 1 && arguments[0] instanceof Node && this.isThereNode(arguments[0])) {
        delNode = arguments[0];
    }
    // 인자가 1개이고 정수타입인 경우
    else if (arguments.length == 1 && typeof arguments[0] === "number" && arguments[0] <= this.length - 1) {
        delNode = this.getNode(arguments[0]);
    } else if (arguments.length == 0) {
        var temp = this.getNode(this.length);
        temp.prev.next = null;
        delete temp;
        return;
    } else {
        console.log("wrong arguments");
        return;
    }

    if (delNode !== this.head) {
        delNode.prev.next = delNode.next;
    }
    // head를 삭제할때
    else {
        this.head = delNode.next;
    }

    if (delNode !== this.tail) {
        delNode.next.prev = delNode.prev;
    }
    // tail을 삭제할때
    else {
        this.tail = delNode.prev;
    }
    delete delNode;
    this.length--;
}

function getNode(index) {
    var resultNode = this.head;
    for (var loop = 0; loop < index; loop++) {
        resultNode = resultNode.next;
    }
    return resultNode;
}

function pushBack(data) {
    var insertNode;
    // 인자가 Node 객체일경우
    if (data instanceof Node) {
        insertNode = data;
    } else if (!(data instanceof Node)) {
        // 인자가 Node 객체가 아닐경우 해당 인자로 새로운 Node객체를 만들어 추가
        insertNode = new Node(data);
    } else {
        //그 외의 경우 에러메시지 출력
        console.log("wrong arguments");
        return;
    }

    //처음 삽입이면

    if (this.head === null) {
        this.head = insertNode;
        this.tail = this.head;
    }
    //처음 삽입이 아니면
    else {
        this.tail.next = insertNode;
        insertNode.prev = this.tail;
        this.tail = insertNode;
        this.length++;
    }
}

function pushFront(data) {
    var insertNode;
    // 인자가 Node 객체일경우
    if (data instanceof Node) {
        insertNode = data;
    } else if (!(data instanceof Node)) {
        // 인자가 Node 객체가 아닐경우 해당 인자로 새로운 Node객체를 만들어 추가
        insertNode = new Node(data);
    } else {
        //그 외의 경우 에러메시지 출력
        console.log("wrong arguments");
        return;
    }

    //처음 삽입이면
    if (this.head === null) {
        this.head = insertNode;
        this.tail = this.head;
    }
    //처음 삽입이 아니면
    else {
        this.head.prev = insertNode;
        insertNode.next = this.head;
        this.head = insertNode;
        this.length++;
    }
}

function popBack() {
    // 메모리 해제를 위해 임시로 레퍼런스를 저장해둘 변수
    var delNode = this.tail;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    delete delNode;
}

function popFront() {
    // 메모리 해제를 위해 임시로 레퍼런스를 저장해둘 변수
    var delNode = this.head;
    this.head.next.prev = null;
    this.head = this.head.next;
    delete delNode;
}

function insert(data, position, LR) {
    var insertNode;
    var position;

    // 인자가 1개일 경우 삽입되는 "것"과 삽입되는 위치로 간주하고 해당 위치에 삽입한다.
    // 첫 인자 : Node객체, 두번 째 인자 : 삽입위치 index

    if (data instanceof Node) {
        // index가 정수일 경우
        if (this.head === null) {
            this.head = data;
            this.tail = this.head;
            this.length++;
            return;
        } else if (typeof position === "number" && position <= this.length - 1) {
            insertNode = data;
            position = this.getNode(position);
        }
        // index가 Node일 경우
        else if (position instanceof Node && this.isThereNode(position)) {
            insertNode = data;
            position = position;
        }
        // 인자오류
        else {
            console.log("wrong arguments");
            return;
        }
    }
    // 첫 인자 : 새로운 Node 객체 값, 두번 째 인자 : 삽입위치 index
    else if (!(data instanceof Node)) {
        // index가 정수일 경우
        //var position = position - 1;
        if (this.head === null && position <= this.length - 1) {
            this.head = new Node(data);
            this.tail = this.head;
            this.length++;
            return;
        } else if (typeof position === "number" && position <= this.length - 1) {
            insertNode = new Node(data);
            position = this.getNode(position);
        }
        // index가 Node일 경우
        else if (position instanceof Node) {
            insertNode = new Node(data);
            position = position;
        }
        // 인자오류
        else {
            console.log("wrong arguments");
            return;
        }
    }

    // position의 왼쪽에 삽입
    if (LR === "L") {
        // head의 prev는 null이다.
        if (position !== this.head) {
            position.prev.next = insertNode;
        } else {
            this.head = insertNode;
        }
        insertNode.next = position;
        insertNode.prev = position.prev;
        position.prev = insertNode;
        this.length++;
    }
    // position의 오른쪽에 삽입
    else {
        // tail의 next는 null이다.
        if (position !== this.tail) {
            position.next.prev = insertNode;
        } else {
            this.tail = insertNode;
        }
        insertNode.next = position.next;
        insertNode.prev = position;
        position.next = insertNode;
        this.length++;
    }
}
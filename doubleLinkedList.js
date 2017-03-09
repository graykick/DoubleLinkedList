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
    // ����Ʈ���� ������ ��带 �����Ѵ�.
    var delNode;
    // ���ڰ� 1���̰� Node��ü�� ���
    if (arguments.length == 1 && arguments[0] instanceof Node && this.isThereNode(arguments[0])) {
        delNode = arguments[0];
    }
    // ���ڰ� 1���̰� ����Ÿ���� ���
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
    // head�� �����Ҷ�
    else {
        this.head = delNode.next;
    }

    if (delNode !== this.tail) {
        delNode.next.prev = delNode.prev;
    }
    // tail�� �����Ҷ�
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
    // ���ڰ� Node ��ü�ϰ��
    if (data instanceof Node) {
        insertNode = data;
    } else if (!(data instanceof Node)) {
        // ���ڰ� Node ��ü�� �ƴҰ�� �ش� ���ڷ� ���ο� Node��ü�� ����� �߰�
        insertNode = new Node(data);
    } else {
        //�� ���� ��� �����޽��� ���
        console.log("wrong arguments");
        return;
    }

    //ó�� �����̸�

    if (this.head === null) {
        this.head = insertNode;
        this.tail = this.head;
    }
    //ó�� ������ �ƴϸ�
    else {
        this.tail.next = insertNode;
        insertNode.prev = this.tail;
        this.tail = insertNode;
        this.length++;
    }
}

function pushFront(data) {
    var insertNode;
    // ���ڰ� Node ��ü�ϰ��
    if (data instanceof Node) {
        insertNode = data;
    } else if (!(data instanceof Node)) {
        // ���ڰ� Node ��ü�� �ƴҰ�� �ش� ���ڷ� ���ο� Node��ü�� ����� �߰�
        insertNode = new Node(data);
    } else {
        //�� ���� ��� �����޽��� ���
        console.log("wrong arguments");
        return;
    }

    //ó�� �����̸�
    if (this.head === null) {
        this.head = insertNode;
        this.tail = this.head;
    }
    //ó�� ������ �ƴϸ�
    else {
        this.head.prev = insertNode;
        insertNode.next = this.head;
        this.head = insertNode;
        this.length++;
    }
}

function popBack() {
    // �޸� ������ ���� �ӽ÷� ���۷����� �����ص� ����
    var delNode = this.tail;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    delete delNode;
}

function popFront() {
    // �޸� ������ ���� �ӽ÷� ���۷����� �����ص� ����
    var delNode = this.head;
    this.head.next.prev = null;
    this.head = this.head.next;
    delete delNode;
}

function insert(data, position, LR) {
    var insertNode;
    var position;

    // ���ڰ� 1���� ��� ���ԵǴ� "��"�� ���ԵǴ� ��ġ�� �����ϰ� �ش� ��ġ�� �����Ѵ�.
    // ù ���� : Node��ü, �ι� ° ���� : ������ġ index

    if (data instanceof Node) {
        // index�� ������ ���
        if (this.head === null) {
            this.head = data;
            this.tail = this.head;
            this.length++;
            return;
        } else if (typeof position === "number" && position <= this.length - 1) {
            insertNode = data;
            position = this.getNode(position);
        }
        // index�� Node�� ���
        else if (position instanceof Node && this.isThereNode(position)) {
            insertNode = data;
            position = position;
        }
        // ���ڿ���
        else {
            console.log("wrong arguments");
            return;
        }
    }
    // ù ���� : ���ο� Node ��ü ��, �ι� ° ���� : ������ġ index
    else if (!(data instanceof Node)) {
        // index�� ������ ���
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
        // index�� Node�� ���
        else if (position instanceof Node) {
            insertNode = new Node(data);
            position = position;
        }
        // ���ڿ���
        else {
            console.log("wrong arguments");
            return;
        }
    }

    // position�� ���ʿ� ����
    if (LR === "L") {
        // head�� prev�� null�̴�.
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
    // position�� �����ʿ� ����
    else {
        // tail�� next�� null�̴�.
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
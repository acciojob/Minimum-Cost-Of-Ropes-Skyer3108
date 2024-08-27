function calculateMinCost() {
  //your code here

	  // Get the input value and split it into an array
    const input = document.getElementById('rope-lengths').value;
    const lengths = input.split(',').map(Number);

    // Calculate the minimum cost
    const cost = minCostOfRopes(lengths);

    // Display the result
    document.getElementById('result').innerText = cost;
}

function minCostOfRopes(lengths) {
    if (lengths.length === 0) return 0;

    // Create a min-heap
    const minHeap = new MinHeap();

    // Add all lengths to the heap
    for (let length of lengths) {
        minHeap.insert(length);
    }

    let totalCost = 0;

    // Connect ropes
    while (minHeap.size() > 1) {
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(index) { return Math.floor((index - 1) / 2); }
    leftChild(index) { return 2 * index + 1; }
    rightChild(index) { return 2 * index + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    heapifyUp(index) {
        const parent = this.parent(index);
        if (index > 0 && this.heap[index] < this.heap[parent]) {
            this.swap(index, parent);
            this.heapifyUp(parent);
        }
    }

    heapifyDown(index) {
        const left = this.leftChild(index);
        const right = this.rightChild(index);
        let smallest = index;

        if (left < this.size() && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.size() && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
  
  
  
}  

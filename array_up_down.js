//js实现数组元素上下移动

// 交换数组元素
var swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

// 上移
$scope.upRecord = function(arr, $index) {
    if($index == 0) {
        return;
    }
    swapItems(arr, $index, $index - 1);
};

// 下移
$scope.downRecord = function(arr, $index) {
    if($index == arr.length -1) {
        return;
    }
    swapItems(arr, $index, $index + 1);
};
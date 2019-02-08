export default function (time) {
    /**
     * @description 兼容safari的iso时间格式，即在最后的偏移时间加上冒号
     */
    let newTime = time.split("");
    newTime.splice(26,0,":");
    newTime = newTime.join("");
    return newTime;
}
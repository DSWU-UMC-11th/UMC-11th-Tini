function formatMemberId(input: unknown): string { 
    if(typeof input === "number") {
        return "숫자 ID: " + input;
    }
    if (typeof input === "string") {
        return "문자열 ID: " + input;
    }
    return "알 수 없는 ID 타입";
}

console.log(formatMemberId(101));
console.log(formatMemberId("member-01"));
console.log(formatMemberId(true));
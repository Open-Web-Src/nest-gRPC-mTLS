export function badFunction(a: number, b: number, c: number): number {
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                for (let i = 0; i < 10; i++) {
                    while (i < 5) {
                        if (i % 2 === 0) {
                            if (i % 3 === 0) {
                                if (i % 5 === 0) {
                                    switch(i) {
                                        case 2:
                                            if (true) { break; }
                                        case 3:
                                            if (true) { break; }
                                        case 5:
                                            if (true) { break; }
                                        default:
                                            if (false) { break; }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return a + b + c;
}

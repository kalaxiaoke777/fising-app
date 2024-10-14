export class Sorting {
    distance(data: any[], type: string) {
        // 检查type参数是否有效
        if (type !== 'tall' && type !== 'low') {
            throw new Error('Invalid type. Please use "tall" or "low".');
        }

        // 根据type参数的值进行排序
        if (type === 'tall') {
            data.sort((a, b) => {
                if (a.distance < b.distance) {
                    return 1;
                }
                if (a.distance > b.distance) {
                    return -1;
                }
                return 0;
            });
        } else if (type === 'low') {
            data.sort((a, b) => {
                if (a.distance > b.distance) {
                    return 1;
                }
                if (a.distance < b.distance) {
                    return -1;
                }
                return 0;
            });
        }

        // 返回排序后的数组
        return data;
    }
    price(data: any[], type: string) {
        // 检查type参数是否有效
        if (type !== 'tall' && type !== 'low') {
            throw new Error('Invalid type. Please use "tall" or "low".');
        }

        // 根据type参数的值进行排序
        data.sort((a, b) => {
            // 处理price为null或undefined的情况，将其视为0
            const priceA = a.price == null ? 0 : a.price;
            const priceB = b.price == null ? 0 : b.price;
            if (type === 'tall') {
                // 从高到低排序
                return Number(priceB) - Number(priceA);
            } else if (type === 'low') {
                // 从低到高排序
                return Number(priceA) - Number(priceB);
            }
            
            // 如果type不是'tall'或'low'，则不会执行到这里，因为前面已经抛出了错误
            return 0;
        });

        // 返回排序后的数组
        return data;
    }
    rate(data: any[], type: string) {
        // 检查type参数是否有效
        if (type !== 'tall' && type !== 'low') {
            throw new Error('Invalid type. Please use "tall" or "low".');
        }

        // 根据type参数的值进行排序
        if (type === 'tall') {
            data.sort((a, b) => {
                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }
                return 0;
            });
        } else if (type === 'low') {
            data.sort((a, b) => {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }
                return 0;
            });
        }

        // 返回排序后的数组
        return data;
    }
}
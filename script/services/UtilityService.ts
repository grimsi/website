export class UtilityService{

    public static random(min: number, max:number, precision: number=0): number{
        min = Math.ceil(min) * Math.pow(10, precision);
        max = Math.floor(max) * Math.pow(10, precision);
        return (Math.floor(Math.random() * (max - min + 1)) + min) / Math.pow(10, precision);
    }

    public static formatStringsAsTable(stringArray: string[], rowLength: number = 5): string{
        let index: number = 0;
        let table: string = '';

        stringArray.forEach((s: string) => {
            table += s;
            if(index == rowLength - 1) table += '\n';
            else table += '\t';
            index ++;
        });
        return table.substring(0, table.length - 1);
    }
}
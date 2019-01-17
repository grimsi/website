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

    public static async getResource(path: string): Promise<string>{

        return new Promise<string>(function(resolve, reject){
            let jsonFile = new XMLHttpRequest();
            jsonFile.open("GET", path,true);
            jsonFile.send();

            jsonFile.onreadystatechange = function() {
                if (jsonFile.readyState== 4 && jsonFile.status == 200) {
                    resolve(jsonFile.responseText);
                }
                else if(jsonFile.readyState== 4 && jsonFile.status != 200){
                    reject(`Error while loading resource "${path}": Code ${jsonFile.status}`);
                }

            };
        });
    }
}
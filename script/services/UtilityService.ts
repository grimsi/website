export class UtilityService{

    public random(min: number, max:number, precision: number=0): number{
        min = Math.ceil(min) * Math.pow(10, precision);
        max = Math.floor(max) * Math.pow(10, precision);
        return (Math.floor(Math.random() * (max - min + 1)) + min) / Math.pow(10, precision);
    }
}
import * as fs from 'fs'

export function RoutesResolve(folderPath : string,func : (module : any) => void){
    fs.readdir(__dirname + folderPath, (err, files) => {
        if(!err){
            files.forEach(file => {
                try{
                    func(require(__dirname + folderPath + "/"+ file))
                }
                catch (e){
                    console.log("erro to load file :" + file,e);
                }
            });
        }
        else
            console.log(err?.message);
    }); 
}
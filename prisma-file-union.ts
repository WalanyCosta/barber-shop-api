import { readFileSync } from 'node:fs';
import {open, appendFile} from 'node:fs/promises'
import {resolve} from 'node:path'

function getSizeContent(path){
    const contents =readFileSync(path, 'utf-8')
   const matches = contents.match(/\n/g)
   const count = matches?.length

   return Number(count)
}

(async () =>{
    const path = `./prisma/${process.env.DESTY_PATH}`
    const pathFileModel = './prisma/model.prisma'
    const sizeContentBase = getSizeContent(path)
    const sizeContentModel = getSizeContent(pathFileModel)
    let count = 0
    let content = '\n'
    const file = await open(pathFileModel)
    
    for await (const line of file.readLines()){
        if(count >= (sizeContentBase - 8)){
            if(count === sizeContentModel){
                content += line
            }else{
                content += line + '\n'
            }
        }
        count++
    }
      
    await appendFile(resolve(path), content)
})();
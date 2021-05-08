import * as child from 'child_process'
import * as fs from 'fs'
const getSourceCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile('./sample-code/cpp.txt', 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const executeCPP = async () => {
  const sourceCode = await getSourceCode()
  fs.writeFile('test.cpp', sourceCode, err => {
    if (err) console.log(err)
  })

  const CPP = child.spawn('g++', ['test.cpp', '-o', 'test'])
  const exec = child.spawn('test')
  
  CPP.stdout.on('data', data => {
    console.log(data)
    exec.stdout.on('data', data => {
      console.log(data)
      
    })
    
  })

  CPP.stderr.on('data', data => {
    console.log(data)
  })

  // exec.stdout.on('data', data => {
  //   console.log(data)
  // })
  
  // exec.stderr.on('data', data => {
  //   console.log(data)
  // })
  
}

executeCPP()

export function add(a: number, b: number): number {
  return a + b
}

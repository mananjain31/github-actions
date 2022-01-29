const {spawn} = require('child_process');

if(process.argv.length < 3) throw Error('provide commit msg');

const associateBindings=childProcess=>{
    childProcess.on('error', data=>console.log(data));
    childProcess.stderr.on('data', data=>console.log('Error:',data.toString()));
    childProcess.stdout.on('data', data=>console.log('Data:',data.toString()));
}

function _runThese(commands, index)
{
    if(index>=commands.length) return;

    let commandArr = [];
    if(typeof(commands[index])=='string')
        commandArr = commands[index].split(' ');
    else if(commands[index] instanceof Array)
        commandArr = commands[index];
    else throw Error(`Invalid command ${commands[index]}`);

    console.log(commandArr[0], commandArr.slice(1));
    const command = spawn(commandArr[0], commandArr.slice(1));
    associateBindings(command);
    command.on('exit', (code, signal)=>{
        console.log('Command : ', commandArr);
        console.log('Code:',code, 'Signal:', signal);
        _runThese(commands, index+1)
    })
}

function runThese(commands)
{
    _runThese(commands, 0) 
}
runThese([
    'git add .',
    ['git', 'commit', '-m', `"${process.argv.slice(2).join(' ')}"`],
    'git push',
]);

console.log('Done ✅');
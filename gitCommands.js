const {spawn} = require('child_process');
const add = spawn('git', ['add', '.']);

if(process.argv.length < 3) throw Error('provide commit msg');

const associateBindings=childProcess=>{
    childProcess.on('error', data=>console.log(data));
    childProcess.stderr.on('data', data=>console.log('Error:',data));
    childProcess.stdout.on('data', data=>console.log('Data:',data));
}
associateBindings(add);

add.on('exit', (code, signal)=>{
    console.log('Code:',code, 'Signal:', signal);
    const commit =  spawn(`git`, ['commit', '-m', `${process.argv.slice(2).join(' ')}`]);
    associateBindings(commit);

    commit.on('exit', (code, signal)=>{
        console.log('Code:',code, 'Signal:', signal);
        const push =  spawn('git' ,['push']);
        associateBindings(push);

        push.on('exit', (code, signal)=>{
            console.log('Code:',code, 'Signal:', signal);
            console.log('Done ✅');
        });

    });
});
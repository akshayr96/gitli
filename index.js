const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const handleCheckout = () => {
	const targetPath = process.cwd()
	const branchPath = path.join(targetPath, '.git', 'refs', 'heads')
	fs.readdir(branchPath, (error, branches) => {
		if(error){
			console.error(error)
			return
		}
		inquirer
  		.prompt({ type: 'list', name: 'branch', choices: branches })
			.then(({ branch }) => {
				const gitDir = path.join(targetPath, '.git')
				console.log(execSync(`git --git-dir=${gitDir} checkout ${branch}`).toString())
			})
			.catch(error => console.log(error))
		});
}

switch(process.argv[2]){
	case 'checkout':
		handleCheckout()
	default:
		return ''
}
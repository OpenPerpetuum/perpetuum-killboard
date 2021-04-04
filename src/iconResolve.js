
export default function resolveIcon(robotName){
	try{
		const parsedIconName = robotName.toLowerCase().split(' ')[0];
		return require("./images/bot_icons/"+parsedIconName+".png");
	}catch(err){
		return "";
	}
};
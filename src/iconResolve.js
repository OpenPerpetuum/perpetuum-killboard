
export default function resolveIcon(robotName){
	const parsedIconName = robotName.toLowerCase().split(' ')[0];
	try{
		return require("./images/bot_icons/"+parsedIconName+".png");
	}catch(err){
		return "";
	}
};
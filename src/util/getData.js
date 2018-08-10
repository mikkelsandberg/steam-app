import { API_KEY } from './apiKey';

async function genericGet(interfaceName, methodName, version, otherParams) {
	try {
		const response = await fetch(
			`http://api.steampowered.com/${interfaceName}/${methodName}/${version}/?key=${API_KEY}${otherParams
				.map(params => {
					return '&' + params.key + '=' + params.value;
				})
				.join('')}`
		);
		const jsonData = await response.json();

		return jsonData;
	} catch (err) {
		console.log('fetch failed', err);
	}
}

export async function getPlayer(playerIds) {
	const player = await genericGet('ISteamUser', 'GetPlayerSummaries', 'v0002', [
		{
			key: 'steamids',
			value: playerIds,
		},
	]);

	return player;
}

export async function getFriends(playerId, relationship) {
	try {
		const requestFriends = await genericGet(
			'ISteamUser',
			'GetFriendList',
			'v0001',
			[
				{
					key: 'steamid',
					value: playerId,
				},
				{
					key: 'relationship',
					value: relationship,
				},
			]
		);

		const friendsList = await requestFriends.friendslist.friends
			.map(id => {
				return getPlayer(id.steamid).then(friend => {
					console.log(friend.response.players[0]);
					return friend.response.players[0];
				});
			})
			.join('');

		const friendsIds = await friendsList;

		return friendsIds;
	} catch (err) {
		console.log('fetch failed', err);
	}
}

import { useState } from 'react';
// import { AppIconButton } from '../../components';
import Tag  from './Tag';
import '../../styles.css';

  

const FippableCard = ( { eventInfo, onFlipCard, stake } ) => {

	const [showFront, setShowFront] = useState(true);

	const flipHome = (betForHome) => {
		setShowFront(betForHome);
		onFlipCard(betForHome)
	}

    return (
      <div style={{ textAlign: 'center' }} className="flip-card">
        <div className={'flip-card-inner ' + (showFront ? 'flip-card-inner-front' : 'flip-card-inner-back')}>
          <div
            style={{ backgroundImage: 'url(./img/sports/bg-baseball.png)', backgroundSize: '100px' }}
            className="flip-card-front swipeCard"
          >
            <h3 style={{ color: 'black', paddingTop: '15px', marginBottom: '1px' }}>{eventInfo.event}</h3>
            <div style={{ color: 'black', paddingTop: '5px' }}>
              {new Date(eventInfo.startDate * 1000).toLocaleString()}
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '5px', paddingBottom: '10px' }}>
              <h3 style={{ color: 'black' }}>{eventInfo.homeTeam}</h3>
              Stake: <Tag className="tag" key="stake" label={'' + stake + ' USDC'} color="false" />
              <br />
              Odd: <Tag className="tag" key="odd" label={'' + eventInfo.moneyline.home.highestOdds} color="true" />
              <br />
              <br />
              <br />
              <button
                imgSrc="./img/flipForward.png"
                color="secondary"
                title={'Flip to ' + eventInfo.awayTeam}
                onClick={() => flipHome(false)}
                onTouchStart={() => flipHome(false)}
              />
            </div>
          </div>

          <div
            style={{ backgroundImage: 'url(./img/sports/bg-baseball.png)', backgroundSize: '100px' }}
            className="flip-card-back swipeCard"
          >
            <h3 style={{ color: 'black', paddingTop: '15px', marginBottom: '1px' }}>{eventInfo.event}</h3>
            <div style={{ color: 'black', paddingTop: '5px' }}>
              {new Date(eventInfo.startDate * 1000).toLocaleString()}
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '10px' }}>
              <h3 style={{ color: 'black' }}>{eventInfo.awayTeam}</h3>
              Stake: <Tag className="tag" key="stake" label={'' + stake + ' USDC'} color="false" />
              <br />
              Odd: <Tag className="tag" key="odd" label={'' + eventInfo.moneyline.away.highestOdds} color="true" />
              <br />
              <br />
              <br />
              <button
                imgSrc="./img/flipBackward.png"
                color="secondary"
                title={'Flip to ' + eventInfo.homeTeam}
                onClick={() => flipHome(true)}
                onTouchStart={() => flipHome(true)}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default FippableCard;
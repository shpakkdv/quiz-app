import * as React from 'react';

import { IUserData } from 'common/models';
import { IUserDataProps, IUserDataState } from './models';
// import * as styles from './styles.css';

export class UserData extends React.PureComponent<IUserDataProps, IUserDataState> {
  state: IUserDataState = {
    userData: {
      name: '',
      surname: '',
      group: '',
    },
  };

  private onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userData: IUserData = {
      ...this.state.userData,
      name: event.target.value,
    };

    this.setState({
      userData,
    });
  }

  private onSurnameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userData: IUserData = {
      ...this.state.userData,
      surname: event.target.value,
    };

    this.setState({
      userData,
    });
  }

  private onGroupChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userData: IUserData = {
      ...this.state.userData,
      group: event.target.value,
    };

    this.setState({
      userData,
    });
  }

  private onStartClick = (): void => {
    this.props.start(this.state.userData);
  }

  render() {
    const { userData: { name, surname, group } } = this.state;
    const isStartButtonDisabled = !name || !surname || !group;

    return (
      <div>
        <div>
          <span className={'user-data__title'}>Имя:</span>
          <input type="text" onChange={this.onNameChange} value={name} maxLength={30} />
        </div>
        <div>
          <span className={'user-data__title'}>Фамилия:</span>
          <input type="text" onChange={this.onSurnameChange} value={surname} maxLength={30} />
        </div>
        <div>
          <span className={'user-data__title'}>Группа:</span>
          <input type="text" onChange={this.onGroupChange} value={group} maxLength={20} />
        </div>
        <div className={'start-button'}><button onClick={this.onStartClick} disabled={isStartButtonDisabled}>Начать</button></div>
      </div>
    );
  }
}

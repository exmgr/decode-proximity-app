/*
 * DECODE App – A mobile app to control your personal data
 *
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: info@dribia.com
 */

import React from 'react';
import { Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import WalkthroughStep from 'lib/Components/WalkthroughStep';
import { Screen, Heading } from 'lib/styles';

const pleaseCrash = () => {
  throw new Error('This is a crash test');
};

const DummyNext = () => {
  const { t } = useTranslation();
  return (
    <Screen centerAligned>
      <Heading>{t('second')}</Heading>
      <WalkthroughStep screen="dummyNext" id="crash">
        <Button
          title="Crash, please"
          onPress={pleaseCrash}
        />
      </WalkthroughStep>
    </Screen>
  );
};

DummyNext.navigationOptions = ({ screenProps: { t } }) => ({
  title: t('next'),
});

export default DummyNext;

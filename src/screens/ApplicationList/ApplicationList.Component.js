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
import { FlatList as ListContainer } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty, prop } from 'ramda';
import EmptyList from 'lib/Components/EmptyList';
import { Screen } from 'lib/styles';
import ListItem from 'lib/Components/ListItem';

const ApplicationList = ({ applications, navigation: { navigate } }) => {
  const { t } = useTranslation('applications');
  return (
    <Screen>
      {isEmpty(applications) ? (<EmptyList text={t('empty')} />) : (
        <ListContainer
          data={applications}
          renderItem={
            ({
              item:
              {
                id, name, title, description, link, image, usageCount, numCertificates,
                firstUse, lastUse, averageUse, sharedData,
              },
            }) => (
              <ListItem
                disabled={usageCount === 0}
                id={id}
                name={t(title)}
                description={`uses: ${usageCount}, certificates: ${numCertificates}`}
                onPress={
                  () => navigate(
                    'ApplicationDetails', {
                      id,
                      name: t(name),
                      image,
                      description: t(description),
                      link,
                      showHistory: (usageCount > 0),
                      stats: { usageCount, firstUse, lastUse, averageUse, sharedData },
                    },
                  )}
              />
            )
          }
          keyExtractor={prop('id')}
        />
      )}
    </Screen>
  );
};

ApplicationList.displayName = 'ApplicationList';

ApplicationList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    usageCount: PropTypes.number.isRequired,
    firstUse: PropTypes.number,
    lastUse: PropTypes.number,
    averageUse: PropTypes.number,
    sharedData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      shared: PropTypes.bool.isRequired,
    })),
    numCertificates: PropTypes.number.isRequired,
  })).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ApplicationList.navigationOptions = ({ screenProps: { t } }) => ({
  title: t('applications:available'),
});

export default ApplicationList;
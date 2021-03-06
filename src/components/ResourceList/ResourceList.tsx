import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import Item from './Item';
import * as styles from './ResourceList.scss';

export interface Props {
  /** Item data; each item is passed to renderItem */
  items: any[];
  /** Function to generate unique identifier for each item passed */
  renderItem(item: any, index: number): React.ReactNode;
  /** Function to render each item */
  idForItem?(item: any, index: number): string | number;
}

export default class ResourceList extends React.PureComponent<Props, never> {
  static Item = Item;

  render() {
    const {items} = this.props;

    return (
      <ul className={styles.ResourceList}>{items.map(this.renderItem)}</ul>
    );
  }

  @autobind
  private renderItem(item: any, index: number) {
    const {renderItem, idForItem = defaultIdForItem} = this.props;

    const key = idForItem(item, index);

    return (
      <li key={key} className={styles.ItemWrapper}>
        {renderItem(item, index)}
      </li>
    );
  }
}

function defaultIdForItem(item: any, index: number) {
  return item.hasOwnProperty('id') ? item.id : index;
}

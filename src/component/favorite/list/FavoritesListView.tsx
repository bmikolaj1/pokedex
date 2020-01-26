import React from "react";
import { ColumnProps } from "antd/lib/table";
import { Table } from "antd";
import "antd/dist/antd.css";
import { IPokemonShort } from "../../../model/pokemon/PokemonShort";

export interface IFavoritesViewOwnProps {
  favoritesList: IPokemonShort[];
  onRowClick: (record: string) => void;
}
type IFavoritesViewProps = IFavoritesViewOwnProps;

interface IFavoritesViewState {}

class FavoritesListView extends React.Component<
  IFavoritesViewProps,
  IFavoritesViewState
> {
  state: IFavoritesViewState = {};

  render = () => {
    const columns: Array<ColumnProps<IPokemonShort>> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      }
    ];

    return (
      <Table
        dataSource={
          this.props.favoritesList && this.props.favoritesList
            ? this.props.favoritesList
            : []
        }
        columns={columns}
        bordered={true}
        rowKey='name'
        pagination={{
          defaultPageSize: 10,
          simple: true,
          showSizeChanger: false,
          total: this.props.favoritesList?.length
        }}
        onRow={record => {
          return {
            onClick: () => this.props.onRowClick(record.url)
          };
        }}
      />
    );
  };
}

export default FavoritesListView as any;

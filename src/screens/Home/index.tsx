import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from "../../components/CarStatus";

import { Container, Content, Label, Title } from "./styles";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);

  const { navigate } = useNavigation();

  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate("arrival", {
        id: vehicleInUse._id.toString(),
      });
    } else {
      return navigate("departure");
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert("Veículo em uso", "Não foi possível carregar o veículo em uso.");
    }
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format("[Saída em] DD/MM/YYYY [às] HH:mm"),
        };
      });
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert("Histórico", "Não foi possível carregar o histórico.");
    }
  }

  function handleHistoricDetails(id: string) {
    navigate("arrival", { id });
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener("change", () => fetchVehicleInUse());

    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicleInUse);
      }
    }
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={<Label>Nenhum registro de utilização.</Label>}
        />
      </Content>
    </Container>
  );
}

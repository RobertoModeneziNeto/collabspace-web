import { useState, useCallback, FormEvent } from "react";

import { toast } from "react-toastify";

import ProfileCard from "../../components/ProfileCard";
import LayoutDefault from "../../layouts/Default";
import {
  Input,
  Container,
  Label,
  Forms,
  Form,
  Sections,
  Section,
  InputGroup,
  Select,
} from "./styles";
import { useAuthentication } from "../../contexts/Authentication";
import { createAddress, updateAddress } from "../../services/address";
import { updatePassword, updateUser } from "../../services/users";
import Button from "../../components/Button";
import { getAddress } from "../../services/viacep";
import InputArea from "../../components/InputArea";
import { formatarCEP } from "../../utils/formatCep";
import { formatarTelefone } from "../../utils/telephone";

const provinces = [
  { key: "AC", value: "Acre" },
  { key: "AL", value: "Alagoas" },
  { key: "AP", value: "Amapá" },
  { key: "AM", value: "Amazonas" },
  { key: "BA", value: "Bahia" },
  { key: "CE", value: "Ceará" },
  { key: "DF", value: "Distrito Federal" },
  { key: "ES", value: "Espírito Santo" },
  { key: "GO", value: "Goiás" },
  { key: "MA", value: "Maranhão" },
  { key: "MT", value: "Mato Grosso" },
  { key: "MS", value: "Mato Grosso do Sul" },
  { key: "MG", value: "Minas Gerais" },
  { key: "PA", value: "Pará" },
  { key: "PB", value: "Paraíba" },
  { key: "PR", value: "Paraná" },
  { key: "PE", value: "Pernambuco" },
  { key: "PI", value: "Piauí" },
  { key: "RJ", value: "Rio de Janeiro" },
  { key: "RN", value: "Rio Grande do Norte" },
  { key: "RS", value: "Rio Grande do Sul" },
  { key: "RO", value: "Rondônia" },
  { key: "RR", value: "Roraima" },
  { key: "SC", value: "Santa Catarina" },
  { key: "SP", value: "São Paulo" },
  { key: "SE", value: "Sergipe" },
  { key: "TO", value: "Tocantins" },
];

const UpdateProfile: React.FC = () => {
  const { user, handleAddress, handleUser } = useAuthentication();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [telephone, setTelephone] = useState(
    formatarTelefone(user?.telephone || ""),
  );
  const [birthDate, setBirthDate] = useState(user?.birthDate || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [country, setCountry] = useState(user?.address?.[0]?.country || "");
  const [cep, setCep] = useState(user?.address?.[0]?.cep || "");
  const [province, setProvince] = useState(user?.address?.[0]?.province || "");
  const [city, setCity] = useState(user?.address?.[0]?.city || "");
  const [street, setStreet] = useState(user?.address?.[0]?.street || "");

  const handleUpdateUser = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { result, message } = await updateUser({
          name,
          bio,
          birthDate,
          telephone,
        });

        if (result === "success") {
          toast.success(message);
          handleUser(name, bio, birthDate, telephone);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [bio, birthDate, handleUser, name, telephone],
  );

  const handleUpdatePassword = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { result, message } = await updatePassword({
          currentPassword,
          newPassword,
        });

        if (result === "success") {
          toast.success(message);
        }
        if (result === "error") toast.error(message);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [currentPassword, newPassword],
  );

  const handleSaveAddress = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        if (user?.id) {
          if (user?.address?.length === 0) {
            const { result, message } = await createAddress({
              cep,
              city,
              country,
              province,
              street,
            });

            if (result === "success") {
              toast.success(message);
              handleAddress(user?.address);
            }
          } else {
            if (user?.address) {
              const id = user?.address[0].id;

              if (id) {
                const { result, message } = await updateAddress({
                  id,
                  cep,
                  city,
                  country,
                  province,
                  street,
                });

                if (result === "success") {
                  toast.success(message);
                  handleAddress([
                    {
                      id,
                      user_id: user.id,
                      cep,
                      city,
                      country,
                      province,
                      street,
                    },
                  ]);
                }
              }
            }
          }
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [
      cep,
      city,
      country,
      handleAddress,
      province,
      street,
      user?.address,
      user?.id,
    ],
  );

  const handleViacep = useCallback(async () => {
    try {
      const { result, data } = await getAddress({
        cep,
      });

      console.log(result);

      if (result === "success") {
        if (data) {
          if (data.address) {
            const { logradouro, localidade, uf } = data.address;

            if (logradouro) {
              setStreet(logradouro);
            }

            if (localidade) {
              setCity(localidade);
            }

            if (uf) {
              let value = "";

              provinces.forEach((province) => {
                if (uf === province.key) {
                  value = province.value;
                }
              });

              setProvince(value);
            }
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [cep]);

  return (
    <LayoutDefault>
      <Container>
        <ProfileCard></ProfileCard>

        <Forms>
          <Form onSubmit={handleUpdateUser}>
            <h1>Sobre Mim</h1>

            <Sections>
              <Section>
                <InputGroup>
                  <Label htmlFor="name"> Nome Completo</Label>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Digite seu nome"
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="telephone">Telefone </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={telephone}
                    maxLength={15}
                    onChange={(e) => {
                      setTelephone(formatarTelefone(e.target.value));
                    }}
                    placeholder="(00) 00000-0000"
                  />
                </InputGroup>
              </Section>

              <Section>
                <InputGroup>
                  <Label htmlFor="bithdate">Data de nascimento</Label>
                  <Input
                    type="date"
                    id="birthdate"
                    value={birthDate}
                    min="1900-01-01"
                    max="2022-12-31"
                    required
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                  />
                </InputGroup>
              </Section>
            </Sections>

            <InputGroup>
              <Label htmlFor="bio">Biografia</Label>
              <InputArea
                name="bio"
                rows={4}
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                placeholder="Fale mais sobre você ..."
              />
            </InputGroup>

            <Button>Salvar</Button>
          </Form>

          <Form onSubmit={handleUpdatePassword}>
            <h1>Alterar senha</h1>
            <Sections>
              <Section>
                <Label htmlFor="currentPassword">Senha atual</Label>
                <Input
                  name="currentPassword"
                  type="currentPassword"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  placeholder="Digite sua senha atual"
                />
              </Section>

              <Section>
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  placeholder="Digite sua nova senha"
                />
              </Section>
            </Sections>

            <Button>Salvar</Button>
          </Form>

          <Form onSubmit={handleSaveAddress}>
            <h1>Endereço</h1>

            <Sections>
              <Section>
                <Label htmlFor="country">País</Label>
                <Input
                  name="country"
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder="Digite o país que você mora"
                />

                <Label htmlFor="province">Estado</Label>
                <Select
                  name="province"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                  placeholder="Seu estado"
                >
                  {provinces.map(({ key, value }) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </Select>

                <Label htmlFor="street">Logradouro</Label>
                <Input
                  name="street"
                  type="text"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  placeholder="Rua da casa, 1234"
                />
              </Section>

              <Section>
                <Label htmlFor="cep">Cep</Label>
                <Input
                  name="cep"
                  type="text"
                  value={cep}
                  maxLength={9}
                  onChange={(e) => {
                    setCep(formatarCEP(e.target.value));
                  }}
                  onBlur={handleViacep}
                  placeholder="00000-000"
                />

                <Label htmlFor="city">Cidade</Label>
                <Input
                  name="city"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="Sua terrinha"
                />
              </Section>
            </Sections>

            <Button>Salvar</Button>
          </Form>
        </Forms>
      </Container>
    </LayoutDefault>
  );
};

export default UpdateProfile;

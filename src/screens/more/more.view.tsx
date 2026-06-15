import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useActiveTheme } from '~/hooks/colorScheme';
import { useMoreScreenViewModel, DAYS_OF_WEEK } from './moreScreen.viewModel';
import { MoreDropdown } from '~/components/moreDropdown/MoreDropdown.view';
import { FormProvider } from 'react-hook-form';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';
import { ColorPicker } from '~/components/inputs/colorPicker/ColorPicker.view';
import { CoverImageInput } from '~/components/inputs/coverImageInput/CoverImageInput.view';
import { CircularImageInput } from '~/components/inputs/circularImageInput/CircularImageInput.view';
import { FormScrollContainer } from '~/components/formScroll/FormScrollContainer';
import { CustomToggle } from '~/components/inputs/toggle/CustomToggle.view';
import { TimePickerModal } from '~/components/modals/timePicker/TimePickerModal.view';
import { ResearchBar } from '~/components/researchBar/ResearchBar.view';
import { CardUser } from '~/components/cardUser/CardUser.view';
import { cn } from '~/utils/cx';

// SVGs
import LogoConnect from '~/assets/svg/LogoConnect.svg';
import Clock from '~/assets/svg/Clock.svg';
import Peoples from '~/assets/svg/Peoples.svg';
import Integrations from '~/assets/svg/Integrations.svg';
import Heart from '~/assets/svg/Heart.svg';
import Exit from '~/assets/svg/Exit.svg';
import WithoutImage from '~/assets/svg/WithoutImage.svg';
import Copy from '~/assets/svg/Copy.svg';
import GoogleCalendar from '~/assets/svg/GoogleCalendar.svg'; 
import Plus from '~/assets/svg/Plus.svg';

const formatTime12h = (hours: number, minutes: number) => {
  const ampm = hours >= 12 ? `PM` : `AM`;
  let h12 = hours % 12;
  if (h12 === 0) h12 = 12;
  const minStr = minutes.toString().padStart(2, `0`);
  const hrStr = h12.toString().padStart(2, `0`);
  return `${hrStr}:${minStr} ${ampm}`;
};

export function MoreScreen() {
  const { colors, vars } = useActiveTheme();
  const vm = useMoreScreenViewModel();

  return (
    <View style={[vars]} className={`flex-1 bg-surface px-4`}>
      <SafeAreaView className={`flex-1`} edges={['top']}>
        {/* Screen Title */}
        <View className={`w-full flex-row items-center justify-center py-4`}>
          <Text className={`text-xl font-bold text-ink font-robotoBold`}>Configurações</Text>
        </View>

        <FormScrollContainer className={`flex-1 mt-2`}>
          {/* Section: Connect Service */}
          <View className={`w-full pb-2 mt-2`}>
            <Text className={`text-lg font-normal text-ink font-robotoMedium`}>Connect Service</Text>
          </View>

          {/* Group 1: Configuration Dropdowns */}
          <View className={`w-full gap-y-1`}>
            <MoreDropdown
              title="Página de agendamentos"
              icon={<LogoConnect color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'agendamentos'}
              onPress={() => vm.toggleDropdown('agendamentos')}
            >
              <FormProvider {...vm.methods}>
                <View className={`gap-y-2 mt-2`}>
                  <Text className={`text-muted text-sm font-robotoRegular mb-1`}>
                    Seu link público de agendamento:
                  </Text>
                  <View className={`bg-stone/10 p-2.5 rounded-lg border border-stone/20 flex-row items-center justify-between mb-4`}>
                    <Text className={`text-ink text-sm font-semibold font-robotoMedium select-all`}>
                      connectservice.com.br/empresa123
                    </Text>
                  </View>

                  <CoverImageInput
                    label="Capa da página de reserva"
                    imageUri={vm.coverImage}
                    onChangeImage={vm.setCoverImage}
                    onRemoveImage={() => vm.setCoverImage('')}
                  />

                  <CircularImageInput
                    label="Logotipo"
                    imageUri={vm.logoImage}
                    placeholderIcon={<WithoutImage color={colors?.surface} />}
                    onChangeImage={vm.setLogoImage}
                    onRemoveImage={() => vm.setLogoImage('')}
                    description="Aparecerá na Página inicial"
                    recommendation="Recomendados: 200 x 200 px"
                  />

                  <TextInputComponent
                    name="companyName"
                    label="Nome da empresa"
                    placeholder="Digite o nome da sua empresa"
                    isRequire
                    labelClass={`text-sm font-normal`}
                  />

                  <TextInputComponent
                    name="pageUrl"
                    label="URL da página"
                    placeholder="ex: minha-empresa"
                    isRequire
                    labelClass={`text-sm font-normal`}
                  />

                  <TextInputComponent
                    name="aboutCompany"
                    label="Sobre a empresa"
                    placeholder="Descreva brevemente a sua empresa"
                    multiline
                    maxLength={200}
                    labelClass={`text-sm font-normal`}
                  />

                  <TextInputComponent
                    name="email"
                    label="Email"
                    placeholder="exemplo@email.com"
                    leftIcon="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    labelClass={`text-sm font-normal`}
                  />

                  <View className={`mb-4`}>
                    <Text className={`text-sm font-normal text-ink mb-1 font-robotoMedium`}>Telefone</Text>
                    <View className={`flex-row items-start`}>
                      <TextInputComponent
                        name="countryCode"
                        label=""
                        placeholder="+55"
                        containerClass={`w-20 mr-2 mb-0`}
                        className={`text-center px-1`}
                      />
                      <TextInputComponent
                        name="phone"
                        label=""
                        placeholder="(00) 00000-0000"
                        maskType="phone"
                        containerClass={`flex-1 mb-0`}
                      />
                    </View>
                  </View>

                  <TextInputComponent
                    name="address"
                    label="Endereço"
                    placeholder="Digite o endereço"
                    labelClass={`text-sm font-normal`}
                  />

                  <TextInputComponent
                    name="city"
                    label="Cidade"
                    placeholder="Digite a cidade"
                    labelClass={`text-sm font-normal`}
                  />

                  <View className={`flex-row justify-between w-full`}>
                    <TextInputComponent
                      name="state"
                      label="Estado"
                      placeholder="UF"
                      containerClass={`w-[48%]`}
                      maxLength={2}
                      autoCapitalize="characters"
                      labelClass={`text-sm font-normal`}
                    />
                    <TextInputComponent
                      name="zipCode"
                      label="CEP"
                      placeholder="00000-000"
                      containerClass={`w-[48%]`}
                      keyboardType="numeric"
                      labelClass={`text-sm font-normal`}
                    />
                  </View>

                  <ColorPicker
                    label="Cor da página de reserva"
                    selectedColor={vm.bookingColor}
                    onSelectColor={vm.setBookingColor}
                    labelClass={`text-sm font-normal text-ink`}
                  />

                  <View className={`mt-4 mb-2`}>
                    <Text className={`text-base font-semibold text-ink font-robotoMedium`}>Redes Sociais</Text>
                  </View>

                  <TextInputComponent
                    name="instagram"
                    label="Instagram"
                    placeholder="@usuario"
                    autoCapitalize="none"
                    labelClass={`text-sm font-normal`}
                  />

                  <TextInputComponent
                    name="facebook"
                    label="Facebook"
                    placeholder="facebook.com/usuario"
                    autoCapitalize="none"
                    labelClass={`text-sm font-normal`}
                  />

                  <TouchableOpacity
                    onPress={vm.onSubmitBookingForm}
                    activeOpacity={0.7}
                    className={`bg-tabBar py-3 rounded-lg items-center justify-center mt-4 active:opacity-80`}
                  >
                    <Text className={`text-surface font-semibold text-sm font-robotoMedium`}>
                      Salvar Alterações
                    </Text>
                  </TouchableOpacity>
                </View>
              </FormProvider>
            </MoreDropdown>

            <MoreDropdown
              title="Horários de Atendimento"
              icon={<Clock color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'horarios'}
              onPress={() => vm.toggleDropdown('horarios')}
            >
              <View className={`gap-y-4`}>
                {/* Copiar para os outros dias button */}
                <View className={`flex-row justify-start mb-2`}>
                  <TouchableOpacity
                    onPress={vm.copyTimesToAllDays}
                    activeOpacity={0.7}
                    className={`flex-row items-center bg-accent px-3 py-1.5 rounded-full shadow-sm elevation-sm` }
                  >
                    <Copy color={colors?.surface} width={16} height={16} className={`mr-1.5`} />
                    <Text className={`text-surface text-xs font-semibold font-robotoMedium`}>
                      Copiar para os outros dias
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Days list */}
                {DAYS_OF_WEEK.map((day) => {
                  const data = vm.operatingHours[day.key];
                  if (!data) return null;

                  const startText = formatTime12h(data.startHours, data.startMinutes);
                  const endText = formatTime12h(data.endHours, data.endMinutes);

                  // Active highlight when editing (being the target of timePickerTarget)
                  const isEditingStart = vm.timePickerTarget?.dayKey === day.key && vm.timePickerTarget?.type === 'start';
                  const isEditingEnd = vm.timePickerTarget?.dayKey === day.key && vm.timePickerTarget?.type === 'end';

                  return (
                    <View key={day.key} className={`flex-row items-center justify-between py-2 border-b border-divider`}>
                      {/* Day Name */}
                      <Text className={`text-ink text-sm font-medium font-robotoMedium flex-1`}>
                        {day.label}
                      </Text>

                      {/* Time Pickers (visible only when day is active) */}
                      <View className={`flex-row items-center gap-x-2 mr-3`}>
                        {data.active ? (
                          <>
                            <TouchableOpacity
                              onPress={() => vm.openTimePicker(day.key, 'start')}
                              activeOpacity={0.7}
                              className={cn(
                                `px-2 py-1 rounded-md border bg-surface`,
                                isEditingStart ? `border-accent bg-accent/5` : `border-stone/50`
                              )}
                            >
                              <Text className={`text-ink text-xs font-robotoMedium`}>
                                {startText}
                              </Text>
                            </TouchableOpacity>

                            <Text className={`text-muted text-xs`}>:</Text>

                            <TouchableOpacity
                              onPress={() => vm.openTimePicker(day.key, 'end')}
                              activeOpacity={0.7}
                              className={cn(
                                `px-2 py-1 rounded-md border bg-surface`,
                                isEditingEnd ? `border-accent bg-accent/5` : `border-stone/50`
                              )}
                            >
                              <Text className={`text-ink text-xs font-robotoMedium`}>
                                {endText}
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <Text className={`text-muted text-xs font-robotoRegular`}>
                            Fechado
                          </Text>
                        )}
                      </View>

                      {/* Toggle Switch */}
                      <CustomToggle
                        value={data.active}
                        onValueChange={() => vm.toggleDay(day.key)}
                      />
                    </View>
                  );
                })}
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Funcionários"
              icon={<Peoples color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'funcionarios'}
              onPress={() => vm.toggleDropdown('funcionarios')}
            >
              <View className={`gap-y-4`}>
                {/* Search Bar */}
                <View className={`flex-row items-center mb-1`}>
                  <ResearchBar
                    data={vm.employees}
                    onFilter={vm.setFilteredEmployees}
                    placeholder={`Pesquisar funcionário`}
                    filterKeys={[`name`, `email`]}
                  />
                </View>

                {/* Add Employee Button */}
                <TouchableOpacity
                  onPress={vm.openEmployeeModal}
                  activeOpacity={0.7}
                  className={`flex-row items-center py-2 self-start active:opacity-80`}
                >
                  <Plus color={colors?.ink} width={16} height={16} />
                  <Text className={`text-ink text-sm font-bold font-robotoBold ml-2`}>
                    Adicionar funcionário
                  </Text>
                </TouchableOpacity>

                {/* Employees Cards List */}
                <View className={`w-full gap-y-1`}>
                  {vm.filteredEmployees?.map((employee) => (
                    <CardUser
                      key={employee.id}
                      name={employee.name}
                      imageUrl={employee.imageUrl}
                    />
                  ))}
                  {vm.filteredEmployees?.length === 0 && (
                    <Text className={`text-muted text-sm font-robotoRegular text-center mt-2`}>
                      Nenhum funcionário encontrado
                    </Text>
                  )}
                </View>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Integrações"
              icon={<Integrations color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'integracoes'}
              onPress={() => vm.toggleDropdown('integracoes')}
            >
              <View className={`gap-3`}>
                <View className={`flex-row items-center justify-between`}>
                  <View className={`flex-row items-center gap-2`}>
                    <GoogleCalendar color={colors?.ink} width={22} height={22} />
                    <Text className={`text-ink text-sm font-medium font-robotoMedium`}>Google Calendar</Text>
                  </View>
                  <View className={`bg-success/10 px-2 py-0.5 rounded`}>
                    <Text className={`text-success text-xs font-semibold font-robotoMedium`}>Ativado</Text>
                  </View>
                </View>
               
              </View>
            </MoreDropdown>
          </View>

          {/* Group 2: App Actions Dropdowns */}
          <View className={`w-full gap-y-1`}>
            <MoreDropdown
              title="Compartilhar App"
              icon={<Heart color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'compartilhar'}
              onPress={() => vm.toggleDropdown('compartilhar')}
            >
              <View className={`gap-2`}>
                <Text className={`text-muted text-sm font-robotoRegular`}>Indique o Connect Service e ganhe benefícios!</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={vm.handleShareApp}
                  className={`bg-tabBar py-2.5 rounded-lg items-center justify-center mt-1 active:opacity-80`}
                >
                  <Text className={`text-surface font-semibold text-sm font-robotoMedium`}>Copiar Link de Convite</Text>
                </TouchableOpacity>
              </View>
            </MoreDropdown>

            <MoreDropdown
              title="Sair"
              icon={<Exit color={colors?.ink} width={22} height={22} />}
              isOpen={vm.activeDropdownKey === 'sair'}
              onPress={() => vm.toggleDropdown('sair')}
            >
              <View className={`gap-2 items-center`}>
                <Text className={`text-muted text-sm text-center font-robotoRegular`}>Deseja realmente sair da sua conta?</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={vm.handleLogout}
                  className={`bg-danger py-2.5 w-full rounded-lg items-center justify-center mt-1 active:opacity-80`}
                >
                  <Text className={`text-white font-semibold text-sm font-robotoMedium`}>Confirmar Logout</Text>
                </TouchableOpacity>
              </View>
            </MoreDropdown>
          </View>

          {/* Footer Spacer for TabBar */}
          <View className={`h-24`} />
        </FormScrollContainer>
      </SafeAreaView>

      {/* Time Picker Modal */}
      {vm.timePickerTarget && (
        <TimePickerModal
          visible={vm.isTimePickerVisible}
          onClose={vm.closeTimePicker}
          hours={
            vm.timePickerTarget.type === 'start'
              ? vm.operatingHours[vm.timePickerTarget.dayKey]?.startHours ?? 9
              : vm.operatingHours[vm.timePickerTarget.dayKey]?.endHours ?? 18
          }
          minutes={
            vm.timePickerTarget.type === 'start'
              ? vm.operatingHours[vm.timePickerTarget.dayKey]?.startMinutes ?? 0
              : vm.operatingHours[vm.timePickerTarget.dayKey]?.endMinutes ?? 0
          }
          onTimeChange={vm.updateSelectedTime}
          minuteInterval={15}
        />
      )}
    </View>
  );
}

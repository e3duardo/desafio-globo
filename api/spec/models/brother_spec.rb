describe Brother, type: :model do
  describe 'associations' do
    it { is_expected.to have_and_belong_to_many(:surveys) }
  end

  describe 'validations' do
    it { 
      is_expected.to define_enum_for(:status).with_values(
        regular: 'regular', out: 'out'
      ).backed_by_column_of_type(:string)
    }
    it { is_expected.to validate_presence_of(:name) }
  end
end
